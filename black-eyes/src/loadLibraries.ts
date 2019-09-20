import { File as MagicaFile, magickLoaded, run,  } from 'magica'
import { loadOpencv, ImageData } from 'mirada'
import { MagicaCodec } from 'ojos'

export async  function loadLibraries() {
  try {
  await magickLoaded
  // console.log(await run({script: 'identify rose:'}), 'se');
  const Magica = {
    fromArrayBuffer: MagicaFile.fromArrayBuffer,
    fromRGBAImageData: async (data: ImageData) => MagicaFile.fromRGBAImageData(data as any),
    run
  }
  await loadOpencv({ formatProxies: [() => new MagicaCodec(Magica)] })
  } catch (error) {
    console.error(error);
    
  }
}