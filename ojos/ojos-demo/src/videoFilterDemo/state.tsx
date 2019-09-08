import { RemoveProperties } from 'misc-utils-of-mine-generic'
import { AddWeightOptions, Bitwise, BitwiseOptions, CannyOptions, ConvertTo, ConvertToOptions, Edge, EdgeOptions, FloodFillOptions, GaussianBlur, GaussianBlurOptions, HistEqualization, HistEqualizationOptions, MorphologyEx, MorphologyExOptions, OperationExecBaseOptions, ReplaceColorOptions, Threshold, ThresholdOptions, WarpPerspective, WarpPerspectiveOptions } from 'ojos'


export enum ToolNames {
  replaceColor = 'replaceColor',
  canny = 'canny',
  convertTo = 'convertTo',
  floodFill = 'floodFill',
  gaussianBlur = 'gaussianBlur',
  threshold = 'threshold',
  morphologyEx = 'morphologyEx',
  histEqualization = 'histEqualization',
  warpPerspective = 'warpPerspective',
  edge = 'edge',
  bitwise = 'bitwise',
  addWeighted = 'addWeighted'
}

type ToolProps<T extends OperationExecBaseOptions> = RemoveProperties<T, keyof OperationExecBaseOptions> & {
  name: ToolNames;
  active?: boolean;
  description: string;
}

export interface State extends StateTools {
  mem: string,
  fps: number;
  order: ToolNames[]
}

export interface StateTools {
  replaceColor: ToolProps<ReplaceColorOptions>;
  canny: ToolProps<CannyOptions>;
  floodFill: ToolProps<FloodFillOptions>;
  convertTo: ToolProps<ConvertToOptions>;
  gaussianBlur: ToolProps<GaussianBlurOptions>;
  threshold: ToolProps<ThresholdOptions>;
  morphologyEx: ToolProps<MorphologyExOptions>;
  histEqualization: ToolProps<HistEqualizationOptions>;
  warpPerspective: ToolProps<WarpPerspectiveOptions>;
  edge: ToolProps<EdgeOptions>;
  bitwise: ToolProps<BitwiseOptions>;
  addWeighted: ToolProps<AddWeightOptions>;
}

let _state: State
export const getState: () => State = () => {
  if (!_state) {
    const tools: StateTools = {
      replaceColor: {
        name: ToolNames.replaceColor,
        description: 'Will replace pixels between lowColor and highColor with given newColorOrImage',
        lowColor: new cv.Scalar(0, 0, 0, 255),
        highColor: new cv.Scalar(150, 150, 150, 255),
        newColorOrImage: new cv.Scalar(255, 0, 0, 255)
      },
      convertTo: {
        description: new ConvertTo().description,
        name: ToolNames.convertTo,
        alpha: 1.5,
        beta: 12
      },
      edge: {
        description: new Edge().description,
        name: ToolNames.edge,
        dx: 2,
        dy: 1,
        ddepth: cv.CV_8U,
        delta: 0,
        ksize: 3,
        scale: 1,
        // channels: false,
        type: 'laplacian'
      },
      threshold: {
        description: new Threshold().description,
        name: ToolNames.threshold,
        maxval: 128,
        thresh: 128,
        type: cv.THRESH_BINARY
      },
      bitwise: {
        description: new Bitwise().description,
        name: ToolNames.bitwise,
        type: 'not'
      },
      gaussianBlur: {
        description: new GaussianBlur().description,
        name: ToolNames.gaussianBlur,
        ksize: { width: 5, height: 5 },
        sigmaX: 1.2,
        sigmaY: 1.2,
        borderType: cv.BORDER_DEFAULT
      },
      warpPerspective: {
        description: new WarpPerspective().description,
        name: ToolNames.warpPerspective,
        inputs: [6, 4, 100, 8, 9, 110, 100, 90],
        outputs: [31, 41, 88, 40, 29, 88, 88, 80],
        drawPoints: true,
        flags: cv.INTER_LINEAR,
        borderType: cv.BORDER_CONSTANT,
        solveMethod: cv.DECOMP_NORMAL,

      },
      histEqualization: {
        description: new HistEqualization().description,
        name: ToolNames.histEqualization,
        mode: 'CLAHE',
        clipLimit: 1,
        tileGridSize: new cv.Size(40, 40),
        channels: true
      },
      morphologyEx: {
        description: new MorphologyEx().description,
        name: ToolNames.morphologyEx,
        op: cv.MORPH_DILATE,
        kernel: cv.getStructuringElement(cv.MORPH_CROSS, { width: 5, height: 7 }),
        iterations: 1,
        // borderType: cv.BORDER_CONSTANT
        //borderValue
      },
      floodFill: {
        description: 'TODO',
        name: ToolNames.floodFill,
        seed: new cv.Point(5, 6),
        newColorOrImage: new cv.Scalar(222, 0, 0, 0),
        lowDiff: new cv.Scalar(19, 19, 91, 255),
        upDiff: new cv.Scalar(229, 255, 255, 255)
      },
      canny: {
        description: 'TODO',
        name: ToolNames.canny,
        threshold1: 1,
        threshold2: 222,
        apertureSize: 3,
        L2gradient: false,
        // channels: false
      },
      addWeighted: {
        description: `Renders each frame as a sum of it and the previous one. Heads up! since this is a "time-aware" filter it doesn't behave well when preceeding others so I recommend to use it at last`,
        name: ToolNames.addWeighted,
        alpha: .5,
        beta: .5,
        gamma: 0,
        src2: null as any
      },
    }
    _state = {
      fps: 0,
      mem: '',
      ...tools,
      order: Object.values(tools).map(v => v.name)
    }
  }
  return _state
}

export function setState(s: Partial<State>) {
  const ss = getState()
  // merge(false, true, ss, s)
  Object.assign(ss, s)
}

interface Example {
  hash: string, images: string[]
}
export function examples(): Example[] {
  return [{
    hash: `state=eyJmcHMiOjAsIm1lbSI6IiIsInJlcGxhY2VDb2xvciI6eyJuYW1lIjoicmVwbGFjZUNvbG9yIiwiZGVzY3JpcHRpb24iOiJXaWxsIHJlcGxhY2UgcGl4ZWxzIGJldHdlZW4gbG93Q29sb3IgYW5kIGhpZ2hDb2xvciB3aXRoIGdpdmVuIG5ld0NvbG9yT3JJbWFnZSIsImxvd0NvbG9yIjp7IjAiOjAsIjEiOjAsIjIiOjAsIjMiOjI1NSwibGVuZ3RoIjo0fSwiaGlnaENvbG9yIjp7IjAiOjE1MCwiMSI6MTUwLCIyIjoxNTAsIjMiOjI1NSwibGVuZ3RoIjo0fSwibmV3Q29sb3JPckltYWdlIjp7IjAiOjI1NSwiMSI6MCwiMiI6MCwiMyI6MjU1LCJsZW5ndGgiOjR9LCJhY3RpdmUiOmZhbHNlfSwiY29udmVydFRvIjp7ImRlc2NyaXB0aW9uIjoiVE9ETyIsIm5hbWUiOiJjb252ZXJ0VG8iLCJhbHBoYSI6MS4zLCJiZXRhIjo2MiwiYWN0aXZlIjp0cnVlfSwiZWRnZSI6eyJkZXNjcmlwdGlvbiI6ImZhY2FkZSBhcm91bmQgY3YuU29iZWwsIGN2LkxhcGxhY2lhbiBhbmQgY3YuU2NoYXJyIiwibmFtZSI6ImVkZ2UiLCJkeCI6MiwiZHkiOjEsImRkZXB0aCI6MCwiZGVsdGEiOjAsImtzaXplIjo3LCJzY2FsZSI6MC4xLCJ0eXBlIjoibGFwbGFjaWFuIiwiYWN0aXZlIjp0cnVlLCJjaGFubmVscyI6ZmFsc2V9LCJ0aHJlc2hvbGQiOnsiZGVzY3JpcHRpb24iOiJUT0RPIiwibmFtZSI6InRocmVzaG9sZCIsIm1heHZhbCI6MjU1LCJ0aHJlc2giOjIwNiwidHlwZSI6MCwiYWN0aXZlIjp0cnVlfSwiYml0d2lzZSI6eyJkZXNjcmlwdGlvbiI6IlRPRE8iLCJuYW1lIjoiYml0d2lzZSIsInR5cGUiOiJub3QiLCJhY3RpdmUiOnRydWV9LCJnYXVzc2lhbkJsdXIiOnsiZGVzY3JpcHRpb24iOiJUT0RPIiwibmFtZSI6ImdhdXNzaWFuQmx1ciIsImtzaXplIjp7IndpZHRoIjozLCJoZWlnaHQiOjN9LCJzaWdtYVgiOjIsInNpZ21hWSI6MiwiYm9yZGVyVHlwZSI6NCwiYWN0aXZlIjp0cnVlfSwid2FycFBlcnNwZWN0aXZlIjp7ImRlc2NyaXB0aW9uIjoiVE9ETyIsIm5hbWUiOiJ3YXJwUGVyc3BlY3RpdmUiLCJpbnB1dHMiOlsxNiwxNCwxMDAsOCw5LDExMCwxMDAsOTBdLCJvdXRwdXRzIjpbNDEsNDEsODgsNDAsMjksODgsODgsODBdLCJkcmF3UG9pbnRzIjpmYWxzZSwiZmxhZ3MiOjEsImJvcmRlclR5cGUiOjAsInNvbHZlTWV0aG9kIjoxNiwiYWN0aXZlIjp0cnVlfSwiaGlzdEVxdWFsaXphdGlvbiI6eyJkZXNjcmlwdGlvbiI6IkFwcGxpZXMgaGlzdG9ncmFtIGVxdWFsaXphdGlvbiB1c2luZyBjdi5lcXVhbGl6ZUhpc3Qgb3IgY3YuQ0xBSEUuIEluIGNhc2Ugc3JjIGltYWdlIGhhcyBtdWx0aXBsZSBjaGFubmVscywgZXF1YWxpemF0aW9uIGlzIGFwcGxpZWQgb24gZWFjaCBvZiB0aGVtIGluZGVwZW5kZW50bHkgYW5kIHRoZW4gdGhlIHJlc3VsdCBpcyBtZXJnZWQiLCJuYW1lIjoiaGlzdEVxdWFsaXphdGlvbiIsIm1vZGUiOiJDTEFIRSIsImNsaXBMaW1pdCI6MSwidGlsZUdyaWRTaXplIjp7IndpZHRoIjo0MCwiaGVpZ2h0Ijo0MH0sImFjdGl2ZSI6ZmFsc2V9LCJtb3JwaG9sb2d5RXgiOnsiZGVzY3JpcHRpb24iOiJUT0RPIiwibmFtZSI6Im1vcnBob2xvZ3lFeCIsIm9wIjoxLCJrZXJuZWwiOnsicm93cyI6NywiY29scyI6NSwidHlwZSI6MCwiZGF0YSI6IkFBQUJBQUFBQUFFQUFBQUFBUUFBQVFFQkFRRUFBQUVBQUFBQUFRQUFBQUFCQUFBPSJ9LCJpdGVyYXRpb25zIjoxLCJhY3RpdmUiOmZhbHNlfSwiZmxvb2RGaWxsIjp7ImRlc2NyaXB0aW9uIjoiVE9ETyIsIm5hbWUiOiJmbG9vZEZpbGwiLCJzZWVkIjp7IngiOjUsInkiOjZ9LCJuZXdDb2xvck9ySW1hZ2UiOnsiMCI6MjIyLCIxIjowLCIyIjowLCIzIjowLCJsZW5ndGgiOjR9LCJsb3dEaWZmIjp7IjAiOjE5LCIxIjoxOSwiMiI6OTEsIjMiOjI1NSwibGVuZ3RoIjo0fSwidXBEaWZmIjp7IjAiOjIyOSwiMSI6MjU1LCIyIjoyNTUsIjMiOjI1NSwibGVuZ3RoIjo0fX0sImNhbm55Ijp7ImRlc2NyaXB0aW9uIjoiVE9ETyIsIm5hbWUiOiJjYW5ueSIsInRocmVzaG9sZDEiOjEsInRocmVzaG9sZDIiOjIyMiwiYXBlcnR1cmVTaXplIjozLCJMMmdyYWRpZW50IjpmYWxzZSwiYWN0aXZlIjpmYWxzZX0sIm9yZGVyIjpbImdhdXNzaWFuQmx1ciIsInJlcGxhY2VDb2xvciIsImNvbnZlcnRUbyIsImVkZ2UiLCJ0aHJlc2hvbGQiLCJiaXR3aXNlIiwid2FycFBlcnNwZWN0aXZlIiwiaGlzdEVxdWFsaXphdGlvbiIsIm1vcnBob2xvZ3lFeCIsImZsb29kRmlsbCIsImNhbm55Il19`,
    images: [`01.png`]
  },
  {
    hash: `state=eyJmcHMiOjAsIm1lbSI6IiIsInJlcGxhY2VDb2xvciI6eyJuYW1lIjoicmVwbGFjZUNvbG9yIiwiZGVzY3JpcHRpb24iOiJXaWxsIHJlcGxhY2UgcGl4ZWxzIGJldHdlZW4gbG93Q29sb3IgYW5kIGhpZ2hDb2xvciB3aXRoIGdpdmVuIG5ld0NvbG9yT3JJbWFnZSIsImxvd0NvbG9yIjp7IjAiOjAsIjEiOjAsIjIiOjAsIjMiOjI1NSwibGVuZ3RoIjo0fSwiaGlnaENvbG9yIjp7IjAiOjE1MCwiMSI6MTUwLCIyIjoxNTAsIjMiOjI1NSwibGVuZ3RoIjo0fSwibmV3Q29sb3JPckltYWdlIjp7IjAiOjI1NSwiMSI6MCwiMiI6MCwiMyI6MjU1LCJsZW5ndGgiOjR9LCJhY3RpdmUiOmZhbHNlfSwiY29udmVydFRvIjp7ImRlc2NyaXB0aW9uIjoiVE9ETyIsIm5hbWUiOiJjb252ZXJ0VG8iLCJhbHBoYSI6MS4xNSwiYmV0YSI6MTcsImFjdGl2ZSI6dHJ1ZX0sImVkZ2UiOnsiZGVzY3JpcHRpb24iOiJmYWNhZGUgYXJvdW5kIGN2LlNvYmVsLCBjdi5MYXBsYWNpYW4gYW5kIGN2LlNjaGFyciIsIm5hbWUiOiJlZGdlIiwiZHgiOjIsImR5IjoxLCJkZGVwdGgiOjAsImRlbHRhIjo3LCJrc2l6ZSI6Nywic2NhbGUiOjEyNDIsInR5cGUiOiJsYXBsYWNpYW4iLCJhY3RpdmUiOnRydWUsImNoYW5uZWxzIjpmYWxzZX0sInRocmVzaG9sZCI6eyJkZXNjcmlwdGlvbiI6IlRPRE8iLCJuYW1lIjoidGhyZXNob2xkIiwibWF4dmFsIjoyMzgsInRocmVzaCI6MTE0LCJ0eXBlIjozLCJhY3RpdmUiOnRydWV9LCJiaXR3aXNlIjp7ImRlc2NyaXB0aW9uIjoiVE9ETyIsIm5hbWUiOiJiaXR3aXNlIiwidHlwZSI6Im5vdCIsImFjdGl2ZSI6dHJ1ZX0sImdhdXNzaWFuQmx1ciI6eyJkZXNjcmlwdGlvbiI6IlRPRE8iLCJuYW1lIjoiZ2F1c3NpYW5CbHVyIiwia3NpemUiOnsid2lkdGgiOjUsImhlaWdodCI6NX0sInNpZ21hWCI6MTIsInNpZ21hWSI6MTAsImJvcmRlclR5cGUiOjQsImFjdGl2ZSI6dHJ1ZX0sIndhcnBQZXJzcGVjdGl2ZSI6eyJkZXNjcmlwdGlvbiI6IlRPRE8iLCJuYW1lIjoid2FycFBlcnNwZWN0aXZlIiwiaW5wdXRzIjpbMTYsMTQsMTAwLDgsOSwxMTAsMTAwLDkwXSwib3V0cHV0cyI6WzQxLDQxLDg4LDQwLDI5LDg4LDg4LDgwXSwiZHJhd1BvaW50cyI6ZmFsc2UsImZsYWdzIjoxLCJib3JkZXJUeXBlIjowLCJzb2x2ZU1ldGhvZCI6MTYsImFjdGl2ZSI6ZmFsc2V9LCJoaXN0RXF1YWxpemF0aW9uIjp7ImRlc2NyaXB0aW9uIjoiQXBwbGllcyBoaXN0b2dyYW0gZXF1YWxpemF0aW9uIHVzaW5nIGN2LmVxdWFsaXplSGlzdCBvciBjdi5DTEFIRS4gSW4gY2FzZSBzcmMgaW1hZ2UgaGFzIG11bHRpcGxlIGNoYW5uZWxzLCBlcXVhbGl6YXRpb24gaXMgYXBwbGllZCBvbiBlYWNoIG9mIHRoZW0gaW5kZXBlbmRlbnRseSBhbmQgdGhlbiB0aGUgcmVzdWx0IGlzIG1lcmdlZCIsIm5hbWUiOiJoaXN0RXF1YWxpemF0aW9uIiwibW9kZSI6IiIsImNsaXBMaW1pdCI6MiwidGlsZUdyaWRTaXplIjp7IndpZHRoIjo0MCwiaGVpZ2h0Ijo0MH0sImFjdGl2ZSI6ZmFsc2V9LCJtb3JwaG9sb2d5RXgiOnsiZGVzY3JpcHRpb24iOiJUT0RPIiwibmFtZSI6Im1vcnBob2xvZ3lFeCIsIm9wIjo0LCJrZXJuZWwiOnsicm93cyI6NywiY29scyI6NSwidHlwZSI6MCwiZGF0YSI6IkFBQUJBQUFBQUFFQUFBQUFBUUFBQVFFQkFRRUFBQUVBQUFBQUFRQUFBQUFCQUFBPSJ9LCJpdGVyYXRpb25zIjoxLCJhY3RpdmUiOnRydWV9LCJmbG9vZEZpbGwiOnsiZGVzY3JpcHRpb24iOiJUT0RPIiwibmFtZSI6ImZsb29kRmlsbCIsInNlZWQiOnsieCI6NSwieSI6Nn0sIm5ld0NvbG9yT3JJbWFnZSI6eyIwIjoyMjIsIjEiOjAsIjIiOjAsIjMiOjAsImxlbmd0aCI6NH0sImxvd0RpZmYiOnsiMCI6MTksIjEiOjE5LCIyIjo5MSwiMyI6MjU1LCJsZW5ndGgiOjR9LCJ1cERpZmYiOnsiMCI6MjI5LCIxIjoyNTUsIjIiOjI1NSwiMyI6MjU1LCJsZW5ndGgiOjR9fSwiY2FubnkiOnsiZGVzY3JpcHRpb24iOiJUT0RPIiwibmFtZSI6ImNhbm55IiwidGhyZXNob2xkMSI6MjIyMjIsInRocmVzaG9sZDIiOjM5MjIyLCJhcGVydHVyZVNpemUiOjcsIkwyZ3JhZGllbnQiOnRydWUsImFjdGl2ZSI6ZmFsc2UsImNoYW5uZWxzIjpmYWxzZX0sIm9yZGVyIjpbImJpdHdpc2UiLCJ0aHJlc2hvbGQiLCJyZXBsYWNlQ29sb3IiLCJlZGdlIiwiZ2F1c3NpYW5CbHVyIiwiY29udmVydFRvIiwid2FycFBlcnNwZWN0aXZlIiwiaGlzdEVxdWFsaXphdGlvbiIsImZsb29kRmlsbCIsImNhbm55IiwibW9ycGhvbG9neUV4Il19`,
    images: [`02.png`]
  },
  {
    hash: `state=eyJmcHMiOjAsIm1lbSI6IiIsInJlcGxhY2VDb2xvciI6eyJuYW1lIjoicmVwbGFjZUNvbG9yIiwiZGVzY3JpcHRpb24iOiJXaWxsIHJlcGxhY2UgcGl4ZWxzIGJldHdlZW4gbG93Q29sb3IgYW5kIGhpZ2hDb2xvciB3aXRoIGdpdmVuIG5ld0NvbG9yT3JJbWFnZSIsImxvd0NvbG9yIjp7IjAiOjAsIjEiOjAsIjIiOjAsIjMiOjI1NSwibGVuZ3RoIjo0fSwiaGlnaENvbG9yIjpbMTEzLDQyLDQyLDI1NV0sIm5ld0NvbG9yT3JJbWFnZSI6eyIwIjoyNTUsIjEiOjAsIjIiOjAsIjMiOjI1NSwibGVuZ3RoIjo0fSwiYWN0aXZlIjp0cnVlfSwiY29udmVydFRvIjp7ImRlc2NyaXB0aW9uIjoiVE9ETyIsIm5hbWUiOiJjb252ZXJ0VG8iLCJhbHBoYSI6MS4xNSwiYmV0YSI6MTcsImFjdGl2ZSI6dHJ1ZX0sImVkZ2UiOnsiZGVzY3JpcHRpb24iOiJmYWNhZGUgYXJvdW5kIGN2LlNvYmVsLCBjdi5MYXBsYWNpYW4gYW5kIGN2LlNjaGFyciIsIm5hbWUiOiJlZGdlIiwiZHgiOjIsImR5IjoxLCJkZGVwdGgiOjAsImRlbHRhIjo3LCJrc2l6ZSI6Nywic2NhbGUiOjEyNDIsInR5cGUiOiJsYXBsYWNpYW4iLCJhY3RpdmUiOnRydWUsImNoYW5uZWxzIjp0cnVlfSwidGhyZXNob2xkIjp7ImRlc2NyaXB0aW9uIjoiVE9ETyIsIm5hbWUiOiJ0aHJlc2hvbGQiLCJtYXh2YWwiOjQ2LCJ0aHJlc2giOjEwMiwidHlwZSI6MywiYWN0aXZlIjp0cnVlfSwiYml0d2lzZSI6eyJkZXNjcmlwdGlvbiI6IlRPRE8iLCJuYW1lIjoiYml0d2lzZSIsInR5cGUiOiJub3QiLCJhY3RpdmUiOnRydWV9LCJnYXVzc2lhbkJsdXIiOnsiZGVzY3JpcHRpb24iOiJUT0RPIiwibmFtZSI6ImdhdXNzaWFuQmx1ciIsImtzaXplIjp7IndpZHRoIjo1LCJoZWlnaHQiOjV9LCJzaWdtYVgiOjEyLCJzaWdtYVkiOjEwLCJib3JkZXJUeXBlIjo0LCJhY3RpdmUiOnRydWV9LCJ3YXJwUGVyc3BlY3RpdmUiOnsiZGVzY3JpcHRpb24iOiJUT0RPIiwibmFtZSI6IndhcnBQZXJzcGVjdGl2ZSIsImlucHV0cyI6WzE2LDE0LDEwMCw4LDksMTEwLDEwMCw5MF0sIm91dHB1dHMiOls0MSw0MSw4OCw0MCwyOSw4OCw4OCw4MF0sImRyYXdQb2ludHMiOmZhbHNlLCJmbGFncyI6MSwiYm9yZGVyVHlwZSI6MCwic29sdmVNZXRob2QiOjE2LCJhY3RpdmUiOmZhbHNlfSwiaGlzdEVxdWFsaXphdGlvbiI6eyJkZXNjcmlwdGlvbiI6IkFwcGxpZXMgaGlzdG9ncmFtIGVxdWFsaXphdGlvbiB1c2luZyBjdi5lcXVhbGl6ZUhpc3Qgb3IgY3YuQ0xBSEUuIEluIGNhc2Ugc3JjIGltYWdlIGhhcyBtdWx0aXBsZSBjaGFubmVscywgZXF1YWxpemF0aW9uIGlzIGFwcGxpZWQgb24gZWFjaCBvZiB0aGVtIGluZGVwZW5kZW50bHkgYW5kIHRoZW4gdGhlIHJlc3VsdCBpcyBtZXJnZWQiLCJuYW1lIjoiaGlzdEVxdWFsaXphdGlvbiIsIm1vZGUiOiIiLCJjbGlwTGltaXQiOjIsInRpbGVHcmlkU2l6ZSI6eyJ3aWR0aCI6NDAsImhlaWdodCI6NDB9LCJhY3RpdmUiOmZhbHNlfSwibW9ycGhvbG9neUV4Ijp7ImRlc2NyaXB0aW9uIjoiVE9ETyIsIm5hbWUiOiJtb3JwaG9sb2d5RXgiLCJvcCI6NCwia2VybmVsIjp7InJvd3MiOjcsImNvbHMiOjUsInR5cGUiOjAsImRhdGEiOiJBQUFCQUFBQUFBRUFBQUFBQVFBQUFRRUJBUUVBQUFFQUFBQUFBUUFBQUFBQkFBQT0ifSwiaXRlcmF0aW9ucyI6MSwiYWN0aXZlIjpmYWxzZX0sImZsb29kRmlsbCI6eyJkZXNjcmlwdGlvbiI6IlRPRE8iLCJuYW1lIjoiZmxvb2RGaWxsIiwic2VlZCI6eyJ4Ijo1LCJ5Ijo2fSwibmV3Q29sb3JPckltYWdlIjp7IjAiOjIyMiwiMSI6MCwiMiI6MCwiMyI6MCwibGVuZ3RoIjo0fSwibG93RGlmZiI6eyIwIjoxOSwiMSI6MTksIjIiOjkxLCIzIjoyNTUsImxlbmd0aCI6NH0sInVwRGlmZiI6eyIwIjoyMjksIjEiOjI1NSwiMiI6MjU1LCIzIjoyNTUsImxlbmd0aCI6NH19LCJjYW5ueSI6eyJkZXNjcmlwdGlvbiI6IlRPRE8iLCJuYW1lIjoiY2FubnkiLCJ0aHJlc2hvbGQxIjoyMjIyMiwidGhyZXNob2xkMiI6MzkyMjIsImFwZXJ0dXJlU2l6ZSI6NywiTDJncmFkaWVudCI6dHJ1ZSwiYWN0aXZlIjpmYWxzZSwiY2hhbm5lbHMiOnRydWV9LCJvcmRlciI6WyJiaXR3aXNlIiwidGhyZXNob2xkIiwicmVwbGFjZUNvbG9yIiwiZWRnZSIsImdhdXNzaWFuQmx1ciIsImNvbnZlcnRUbyIsIndhcnBQZXJzcGVjdGl2ZSIsImhpc3RFcXVhbGl6YXRpb24iLCJmbG9vZEZpbGwiLCJjYW5ueSIsIm1vcnBob2xvZ3lFeCJdfQ==`,
    images: [`03.png`]
  },
  {
    hash: `state=eyJmcHMiOjAsIm1lbSI6IiIsInJlcGxhY2VDb2xvciI6eyJuYW1lIjoicmVwbGFjZUNvbG9yIiwiZGVzY3JpcHRpb24iOiJXaWxsIHJlcGxhY2UgcGl4ZWxzIGJldHdlZW4gbG93Q29sb3IgYW5kIGhpZ2hDb2xvciB3aXRoIGdpdmVuIG5ld0NvbG9yT3JJbWFnZSIsImxvd0NvbG9yIjp7IjAiOjAsIjEiOjAsIjIiOjAsIjMiOjI1NSwibGVuZ3RoIjo0fSwiaGlnaENvbG9yIjpbMTEzLDQyLDQyLDI1NV0sIm5ld0NvbG9yT3JJbWFnZSI6eyIwIjoyNTUsIjEiOjAsIjIiOjAsIjMiOjI1NSwibGVuZ3RoIjo0fSwiYWN0aXZlIjpmYWxzZX0sImNvbnZlcnRUbyI6eyJkZXNjcmlwdGlvbiI6IlRPRE8iLCJuYW1lIjoiY29udmVydFRvIiwiYWxwaGEiOjIuNDUsImJldGEiOjY3LCJhY3RpdmUiOmZhbHNlfSwiZWRnZSI6eyJkZXNjcmlwdGlvbiI6ImZhY2FkZSBhcm91bmQgY3YuU29iZWwsIGN2LkxhcGxhY2lhbiBhbmQgY3YuU2NoYXJyIiwibmFtZSI6ImVkZ2UiLCJkeCI6MiwiZHkiOjEsImRkZXB0aCI6MCwiZGVsdGEiOjIsImtzaXplIjo3LCJzY2FsZSI6MiwidHlwZSI6ImxhcGxhY2lhbiIsImFjdGl2ZSI6dHJ1ZSwiY2hhbm5lbHMiOnRydWV9LCJ0aHJlc2hvbGQiOnsiZGVzY3JpcHRpb24iOiJUT0RPIiwibmFtZSI6InRocmVzaG9sZCIsIm1heHZhbCI6NDYsInRocmVzaCI6MTAyLCJ0eXBlIjozLCJhY3RpdmUiOnRydWV9LCJiaXR3aXNlIjp7ImRlc2NyaXB0aW9uIjoiVE9ETyIsIm5hbWUiOiJiaXR3aXNlIiwidHlwZSI6Im5vdCIsImFjdGl2ZSI6dHJ1ZX0sImdhdXNzaWFuQmx1ciI6eyJkZXNjcmlwdGlvbiI6IlRPRE8iLCJuYW1lIjoiZ2F1c3NpYW5CbHVyIiwia3NpemUiOnsid2lkdGgiOjcsImhlaWdodCI6N30sInNpZ21hWCI6MjIsInNpZ21hWSI6MjIsImJvcmRlclR5cGUiOjQsImFjdGl2ZSI6dHJ1ZX0sIndhcnBQZXJzcGVjdGl2ZSI6eyJkZXNjcmlwdGlvbiI6IlRPRE8iLCJuYW1lIjoid2FycFBlcnNwZWN0aXZlIiwiaW5wdXRzIjpbMTYsMTQsMTAwLDgsOSwxMTAsMTAwLDkwXSwib3V0cHV0cyI6WzQxLDQxLDg4LDQwLDI5LDg4LDg4LDgwXSwiZHJhd1BvaW50cyI6ZmFsc2UsImZsYWdzIjoxLCJib3JkZXJUeXBlIjowLCJzb2x2ZU1ldGhvZCI6MTYsImFjdGl2ZSI6ZmFsc2V9LCJoaXN0RXF1YWxpemF0aW9uIjp7ImRlc2NyaXB0aW9uIjoiQXBwbGllcyBoaXN0b2dyYW0gZXF1YWxpemF0aW9uIHVzaW5nIGN2LmVxdWFsaXplSGlzdCBvciBjdi5DTEFIRS4gSW4gY2FzZSBzcmMgaW1hZ2UgaGFzIG11bHRpcGxlIGNoYW5uZWxzLCBlcXVhbGl6YXRpb24gaXMgYXBwbGllZCBvbiBlYWNoIG9mIHRoZW0gaW5kZXBlbmRlbnRseSBhbmQgdGhlbiB0aGUgcmVzdWx0IGlzIG1lcmdlZCIsIm5hbWUiOiJoaXN0RXF1YWxpemF0aW9uIiwibW9kZSI6IiIsImNsaXBMaW1pdCI6MiwidGlsZUdyaWRTaXplIjp7IndpZHRoIjo0MCwiaGVpZ2h0Ijo0MH0sImFjdGl2ZSI6ZmFsc2V9LCJtb3JwaG9sb2d5RXgiOnsiZGVzY3JpcHRpb24iOiJUT0RPIiwibmFtZSI6Im1vcnBob2xvZ3lFeCIsIm9wIjo0LCJrZXJuZWwiOnsicm93cyI6NywiY29scyI6NSwidHlwZSI6MCwiZGF0YSI6IkFBQUJBQUFBQUFFQUFBQUFBUUFBQVFFQkFRRUFBQUVBQUFBQUFRQUFBQUFCQUFBPSJ9LCJpdGVyYXRpb25zIjoxLCJhY3RpdmUiOmZhbHNlfSwiZmxvb2RGaWxsIjp7ImRlc2NyaXB0aW9uIjoiVE9ETyIsIm5hbWUiOiJmbG9vZEZpbGwiLCJzZWVkIjp7IngiOjUsInkiOjZ9LCJuZXdDb2xvck9ySW1hZ2UiOnsiMCI6MjIyLCIxIjowLCIyIjowLCIzIjowLCJsZW5ndGgiOjR9LCJsb3dEaWZmIjp7IjAiOjE5LCIxIjoxOSwiMiI6OTEsIjMiOjI1NSwibGVuZ3RoIjo0fSwidXBEaWZmIjp7IjAiOjIyOSwiMSI6MjU1LCIyIjoyNTUsIjMiOjI1NSwibGVuZ3RoIjo0fX0sImNhbm55Ijp7ImRlc2NyaXB0aW9uIjoiVE9ETyIsIm5hbWUiOiJjYW5ueSIsInRocmVzaG9sZDEiOjg2MSwidGhyZXNob2xkMiI6MTEyMSwiYXBlcnR1cmVTaXplIjozLCJMMmdyYWRpZW50Ijp0cnVlLCJhY3RpdmUiOnRydWUsImNoYW5uZWxzIjp0cnVlfSwib3JkZXIiOlsiYml0d2lzZSIsInRocmVzaG9sZCIsInJlcGxhY2VDb2xvciIsImdhdXNzaWFuQmx1ciIsImVkZ2UiLCJ3YXJwUGVyc3BlY3RpdmUiLCJoaXN0RXF1YWxpemF0aW9uIiwiZmxvb2RGaWxsIiwibW9ycGhvbG9neUV4IiwiY29udmVydFRvIiwiY2FubnkiXX0=`,
    images: [`04.png`]
  },
  {
    hash: `state=eyJmcHMiOjAsIm1lbSI6IiIsInJlcGxhY2VDb2xvciI6eyJuYW1lIjoicmVwbGFjZUNvbG9yIiwiZGVzY3JpcHRpb24iOiJXaWxsIHJlcGxhY2UgcGl4ZWxzIGJldHdlZW4gbG93Q29sb3IgYW5kIGhpZ2hDb2xvciB3aXRoIGdpdmVuIG5ld0NvbG9yT3JJbWFnZSIsImxvd0NvbG9yIjp7IjAiOjAsIjEiOjAsIjIiOjAsIjMiOjI1NSwibGVuZ3RoIjo0fSwiaGlnaENvbG9yIjp7IjAiOjE1MCwiMSI6MTUwLCIyIjoxNTAsIjMiOjI1NSwibGVuZ3RoIjo0fSwibmV3Q29sb3JPckltYWdlIjp7IjAiOjI1NSwiMSI6MCwiMiI6MCwiMyI6MjU1LCJsZW5ndGgiOjR9fSwiY29udmVydFRvIjp7ImRlc2NyaXB0aW9uIjoiVE9ETyIsIm5hbWUiOiJjb252ZXJ0VG8iLCJhbHBoYSI6MS41LCJiZXRhIjoxMn0sImFkZFdlaWdodGVkIjp7ImRlc2NyaXB0aW9uIjoiUmVuZGVycyBlYWNoIGZyYW1lIGFzIGEgc3VtIG9mIGl0IGFuZCB0aGUgcHJldmlvdXMgb25lIiwibmFtZSI6ImFkZFdlaWdodGVkIiwiYWxwaGEiOjAuMDUsImJldGEiOjAuOTUsImdhbW1hIjowLCJzcmMyIjpudWxsLCJhY3RpdmUiOnRydWV9LCJlZGdlIjp7ImRlc2NyaXB0aW9uIjoiZmFjYWRlIGFyb3VuZCBjdi5Tb2JlbCwgY3YuTGFwbGFjaWFuIGFuZCBjdi5TY2hhcnIiLCJuYW1lIjoiZWRnZSIsImR4IjoyLCJkeSI6MSwiZGRlcHRoIjowLCJkZWx0YSI6MCwia3NpemUiOjMsInNjYWxlIjoxLCJ0eXBlIjoibGFwbGFjaWFuIn0sInRocmVzaG9sZCI6eyJkZXNjcmlwdGlvbiI6IlRPRE8iLCJuYW1lIjoidGhyZXNob2xkIiwibWF4dmFsIjoxMjgsInRocmVzaCI6MTI4LCJ0eXBlIjowfSwiYml0d2lzZSI6eyJkZXNjcmlwdGlvbiI6IlRPRE8iLCJuYW1lIjoiYml0d2lzZSIsInR5cGUiOiJub3QifSwiZ2F1c3NpYW5CbHVyIjp7ImRlc2NyaXB0aW9uIjoiVE9ETyIsIm5hbWUiOiJnYXVzc2lhbkJsdXIiLCJrc2l6ZSI6eyJ3aWR0aCI6MywiaGVpZ2h0IjozfSwic2lnbWFYIjoxLjIsInNpZ21hWSI6MS4yLCJib3JkZXJUeXBlIjo0LCJhY3RpdmUiOnRydWV9LCJ3YXJwUGVyc3BlY3RpdmUiOnsiZGVzY3JpcHRpb24iOiJUT0RPIiwibmFtZSI6IndhcnBQZXJzcGVjdGl2ZSIsImlucHV0cyI6WzYsNCwxMDAsOCw5LDExMCwxMDAsOTBdLCJvdXRwdXRzIjpbMzEsNDEsODgsNDAsMjksODgsODgsODBdLCJkcmF3UG9pbnRzIjp0cnVlLCJmbGFncyI6MSwiYm9yZGVyVHlwZSI6MCwic29sdmVNZXRob2QiOjE2fSwiaGlzdEVxdWFsaXphdGlvbiI6eyJkZXNjcmlwdGlvbiI6IkFwcGxpZXMgaGlzdG9ncmFtIGVxdWFsaXphdGlvbiB1c2luZyBjdi5lcXVhbGl6ZUhpc3Qgb3IgY3YuQ0xBSEUuIEluIGNhc2Ugc3JjIGltYWdlIGhhcyBtdWx0aXBsZSBjaGFubmVscywgZXF1YWxpemF0aW9uIGlzIGFwcGxpZWQgb24gZWFjaCBvZiB0aGVtIGluZGVwZW5kZW50bHkgYW5kIHRoZW4gdGhlIHJlc3VsdCBpcyBtZXJnZWQiLCJuYW1lIjoiaGlzdEVxdWFsaXphdGlvbiIsIm1vZGUiOiJDTEFIRSIsImNsaXBMaW1pdCI6MSwidGlsZUdyaWRTaXplIjp7IndpZHRoIjo0MCwiaGVpZ2h0Ijo0MH0sImNoYW5uZWxzIjp0cnVlfSwibW9ycGhvbG9neUV4Ijp7ImRlc2NyaXB0aW9uIjoiVE9ETyIsIm5hbWUiOiJtb3JwaG9sb2d5RXgiLCJvcCI6MSwia2VybmVsIjp7InJvd3MiOjcsImNvbHMiOjUsInR5cGUiOjAsImRhdGEiOiJBQUFCQUFBQUFBRUFBQUFBQVFBQUFRRUJBUUVBQUFFQUFBQUFBUUFBQUFBQkFBQT0ifSwiaXRlcmF0aW9ucyI6MX0sImZsb29kRmlsbCI6eyJkZXNjcmlwdGlvbiI6IlRPRE8iLCJuYW1lIjoiZmxvb2RGaWxsIiwic2VlZCI6eyJ4Ijo1LCJ5Ijo2fSwibmV3Q29sb3JPckltYWdlIjp7IjAiOjIyMiwiMSI6MCwiMiI6MCwiMyI6MCwibGVuZ3RoIjo0fSwibG93RGlmZiI6eyIwIjoxOSwiMSI6MTksIjIiOjkxLCIzIjoyNTUsImxlbmd0aCI6NH0sInVwRGlmZiI6eyIwIjoyMjksIjEiOjI1NSwiMiI6MjU1LCIzIjoyNTUsImxlbmd0aCI6NH19LCJjYW5ueSI6eyJkZXNjcmlwdGlvbiI6IlRPRE8iLCJuYW1lIjoiY2FubnkiLCJ0aHJlc2hvbGQxIjoxLCJ0aHJlc2hvbGQyIjoxMzksImFwZXJ0dXJlU2l6ZSI6MywiTDJncmFkaWVudCI6ZmFsc2UsImFjdGl2ZSI6dHJ1ZSwiY2hhbm5lbHMiOnRydWV9LCJvcmRlciI6WyJyZXBsYWNlQ29sb3IiLCJjb252ZXJ0VG8iLCJlZGdlIiwidGhyZXNob2xkIiwiYml0d2lzZSIsIndhcnBQZXJzcGVjdGl2ZSIsImdhdXNzaWFuQmx1ciIsImhpc3RFcXVhbGl6YXRpb24iLCJtb3JwaG9sb2d5RXgiLCJmbG9vZEZpbGwiLCJjYW5ueSIsImFkZFdlaWdodGVkIl19`,
    images: [`05.png`, `06.png`]
  },
    // {
    //   hash: ``,
    //   image: ``
    // },
    // {
    //   hash: ``,
    //   image: ``
    // },
    // {
    //   hash: ``,
    //   image: ``
    // },
    // {
    //   hash: ``,
    //   image: ``
    // }
  ]
}
