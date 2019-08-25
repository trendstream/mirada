
import { InputArray, OutputArray, int, ColorConversionCodes } from './_types'
/*
 * # imgproc_color_conversions
 *
 * TODO  
 */

/**
 * The function converts an input image from one color space to another. In case of a transformation
 * to-from RGB color space, the order of the channels should be specified explicitly (RGB or BGR).
 * Note that the default color format in OpenCV is often referred to as RGB but it is actually BGR
 * (the bytes are reversed). So the first byte in a standard (24-bit) color image will be an 8-bit
 * Blue component, the second byte will be Green, and the third byte will be Red. The fourth, fifth,
 * and sixth bytes would then be the second pixel (Blue, then Green, then Red), and so on.
 * 
 * The conventional ranges for R, G, and B channel values are:
 * 
 * 0 to 255 for CV_8U images
 * 0 to 65535 for CV_16U images
 * 0 to 1 for CV_32F images
 * 
 * In case of linear transformations, the range does not matter. But in case of a non-linear
 * transformation, an input RGB image should be normalized to the proper value range to get the
 * correct results, for example, for RGB `$\\rightarrow$` L*u*v* transformation. For example, if you
 * have a 32-bit floating-point image directly converted from an 8-bit image without any scaling, then
 * it will have the 0..255 value range instead of 0..1 assumed by the function. So, before calling
 * [cvtColor](#d8/d01/group__imgproc__color__conversions_1ga397ae87e1288a81d2363b61574eb8cab}) , you
 * need first to scale the image down: 
 * 
 * ```cpp
 * img *= 1./255;
 * cvtColor(img, img, COLOR_BGR2Luv);
 * ```
 * 
 *  If you use
 * [cvtColor](#d8/d01/group__imgproc__color__conversions_1ga397ae87e1288a81d2363b61574eb8cab}) with
 * 8-bit images, the conversion will have some information lost. For many applications, this will not
 * be noticeable but it is recommended to use 32-bit images in applications that need the full range
 * of colors or that convert an image before an operation and then convert back.
 * 
 * If conversion adds the alpha channel, its value will set to the maximum of corresponding channel
 * range: 255 for CV_8U, 65535 for CV_16U, 1 for CV_32F.
 * 
 * [Color conversions](#de/d25/imgproc_color_conversions})
 * 
 * @param src input image: 8-bit unsigned, 16-bit unsigned ( CV_16UC... ), or single-precision
 * floating-point.
 * @param dst output image of the same size and depth as src.
 * @param code color space conversion code (see ColorConversionCodes).
 * @param dstCn number of channels in the destination image; if the parameter is 0, the number of the
 * channels is derived automatically from src and code.
 */
export declare function cvtColor(src: InputArray, dst: OutputArray, code: int, dstCn?: int): void

/**
 * This function only supports YUV420 to RGB conversion as of now.
 * 
 * @param src1 8-bit image (CV_8U) of the Y plane.
 * @param src2 image containing interleaved U/V plane.
 * @param dst output image.
 * @param code Specifies the type of conversion. It can take any of the following values:
 * COLOR_YUV2BGR_NV12COLOR_YUV2RGB_NV12COLOR_YUV2BGRA_NV12COLOR_YUV2RGBA_NV12COLOR_YUV2BGR_NV21COLOR_YU
 * V2RGB_NV21COLOR_YUV2BGRA_NV21COLOR_YUV2RGBA_NV21
 */
export declare function cvtColorTwoPlane(src1: InputArray, src2: InputArray, dst: OutputArray, code: int): void

/**
 * The function can do the following transformations:
 * 
 * Demosaicing using bilinear
 * interpolation[COLOR_BayerBG2BGR](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3
 * a10e24ef5ef0a8945844ab075687f4d4196abe1ce0db4}) ,
 * [COLOR_BayerGB2BGR](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0a
 * cef801137d9696dcb622122a7ef266c6}) ,
 * [COLOR_BayerRG2BGR](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0a
 * 275d4d0ff99fdf45b2b6b421a14ec831}) ,
 * [COLOR_BayerGR2BGR](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0a
 * fe3d71ad80f5f067d3d76b376cf8d951})[COLOR_BayerBG2GRAY](#d8/d01/group__imgproc__color__conversions_1g
 * ga4e0972be5de079fed4e3a10e24ef5ef0a08febd33b0214417dd33a7fb014bf99a}) ,
 * [COLOR_BayerGB2GRAY](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0
 * a63667769d13ad6dff2b5a296f4c966d2}) ,
 * [COLOR_BayerRG2GRAY](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0
 * ad4fbbce0080be39beb5397716bac3ccc}) ,
 * [COLOR_BayerGR2GRAY](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0
 * aaab526ce2ad4ce74603c711b3c22a38a})
 * Demosaicing using Variable Number of
 * Gradients.[COLOR_BayerBG2BGR_VNG](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e
 * 3a10e24ef5ef0a03fa881afa10795e9f4344a50b80db7f}) ,
 * [COLOR_BayerGB2BGR_VNG](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5
 * ef0ae47bd67001d93fbee5638f61ce256b68}) ,
 * [COLOR_BayerRG2BGR_VNG](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5
 * ef0ad298bb184eda5bf3a58fbc4e509c0e43}) ,
 * [COLOR_BayerGR2BGR_VNG](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5
 * ef0ad787e2911c5b21eaf4d7ffe6f85ad5a8})
 * Edge-Aware
 * Demosaicing.[COLOR_BayerBG2BGR_EA](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4
 * e3a10e24ef5ef0af945cf163b1b5d01b69feabfe10d62bc}) ,
 * [COLOR_BayerGB2BGR_EA](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5e
 * f0a3ac0015fd225d6e02485c822fb26b4b6}) ,
 * [COLOR_BayerRG2BGR_EA](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5e
 * f0a9a7ff84cd856119c6c5b8ecb81ba9284}) ,
 * [COLOR_BayerGR2BGR_EA](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5e
 * f0af51a3d5aceb2256a59c3a4c8e499d7e3})
 * Demosaicing with alpha
 * channel[COLOR_BayerBG2BGRA](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e2
 * 4ef5ef0a64d2dcd6fd8f41e865801fda7a2b75e4}) ,
 * [COLOR_BayerGB2BGRA](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0
 * ace94e0ec556c55476cd451fbcd411bb8}) ,
 * [COLOR_BayerRG2BGRA](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0
 * af3d528d5f0f7c24ac08dd5e5a8f19ddc}) ,
 * [COLOR_BayerGR2BGRA](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0
 * a850bc919c36bb360f1270ffb9f839532})
 * 
 * [cvtColor](#d8/d01/group__imgproc__color__conversions_1ga397ae87e1288a81d2363b61574eb8cab})
 * 
 * @param src input image: 8-bit unsigned or 16-bit unsigned.
 * @param dst output image of the same size and depth as src.
 * @param code Color space conversion code (see the description below).
 * @param dstCn number of channels in the destination image; if the parameter is 0, the number of the
 * channels is derived automatically from src and code.
 */
export declare function demosaicing(src: InputArray, dst: OutputArray, code: int, dstCn?: int): void

/**
 * 
 */
export declare const COLOR_BGR2BGRA: ColorConversionCodes // initializer: = 0

/**
 * 
 */
export declare const COLOR_RGB2RGBA: ColorConversionCodes // initializer: = COLOR_BGR2BGRA

/**
 * 
 */
export declare const COLOR_BGRA2BGR: ColorConversionCodes // initializer: = 1

/**
 * 
 */
export declare const COLOR_RGBA2RGB: ColorConversionCodes // initializer: = COLOR_BGRA2BGR

/**
 * 
 */
export declare const COLOR_BGR2RGBA: ColorConversionCodes // initializer: = 2

/**
 * 
 */
export declare const COLOR_RGB2BGRA: ColorConversionCodes // initializer: = COLOR_BGR2RGBA

/**
 * 
 */
export declare const COLOR_RGBA2BGR: ColorConversionCodes // initializer: = 3

/**
 * 
 */
export declare const COLOR_BGRA2RGB: ColorConversionCodes // initializer: = COLOR_RGBA2BGR

/**
 * 
 */
export declare const COLOR_BGR2RGB: ColorConversionCodes // initializer: = 4

/**
 * 
 */
export declare const COLOR_RGB2BGR: ColorConversionCodes // initializer: = COLOR_BGR2RGB

/**
 * 
 */
export declare const COLOR_BGRA2RGBA: ColorConversionCodes // initializer: = 5

/**
 * 
 */
export declare const COLOR_RGBA2BGRA: ColorConversionCodes // initializer: = COLOR_BGRA2RGBA

/**
 * 
 */
export declare const COLOR_BGR2GRAY: ColorConversionCodes // initializer: = 6

/**
 * 
 */
export declare const COLOR_RGB2GRAY: ColorConversionCodes // initializer: = 7

/**
 * 
 */
export declare const COLOR_GRAY2BGR: ColorConversionCodes // initializer: = 8

/**
 * 
 */
export declare const COLOR_GRAY2RGB: ColorConversionCodes // initializer: = COLOR_GRAY2BGR

/**
 * 
 */
export declare const COLOR_GRAY2BGRA: ColorConversionCodes // initializer: = 9

/**
 * 
 */
export declare const COLOR_GRAY2RGBA: ColorConversionCodes // initializer: = COLOR_GRAY2BGRA

/**
 * 
 */
export declare const COLOR_BGRA2GRAY: ColorConversionCodes // initializer: = 10

/**
 * 
 */
export declare const COLOR_RGBA2GRAY: ColorConversionCodes // initializer: = 11

/**
 * 
 */
export declare const COLOR_BGR2BGR565: ColorConversionCodes // initializer: = 12

/**
 * 
 */
export declare const COLOR_RGB2BGR565: ColorConversionCodes // initializer: = 13

/**
 * 
 */
export declare const COLOR_BGR5652BGR: ColorConversionCodes // initializer: = 14

/**
 * 
 */
export declare const COLOR_BGR5652RGB: ColorConversionCodes // initializer: = 15

/**
 * 
 */
export declare const COLOR_BGRA2BGR565: ColorConversionCodes // initializer: = 16

/**
 * 
 */
export declare const COLOR_RGBA2BGR565: ColorConversionCodes // initializer: = 17

/**
 * 
 */
export declare const COLOR_BGR5652BGRA: ColorConversionCodes // initializer: = 18

/**
 * 
 */
export declare const COLOR_BGR5652RGBA: ColorConversionCodes // initializer: = 19

/**
 * 
 */
export declare const COLOR_GRAY2BGR565: ColorConversionCodes // initializer: = 20

/**
 * 
 */
export declare const COLOR_BGR5652GRAY: ColorConversionCodes // initializer: = 21

/**
 * 
 */
export declare const COLOR_BGR2BGR555: ColorConversionCodes // initializer: = 22

/**
 * 
 */
export declare const COLOR_RGB2BGR555: ColorConversionCodes // initializer: = 23

/**
 * 
 */
export declare const COLOR_BGR5552BGR: ColorConversionCodes // initializer: = 24

/**
 * 
 */
export declare const COLOR_BGR5552RGB: ColorConversionCodes // initializer: = 25

/**
 * 
 */
export declare const COLOR_BGRA2BGR555: ColorConversionCodes // initializer: = 26

/**
 * 
 */
export declare const COLOR_RGBA2BGR555: ColorConversionCodes // initializer: = 27

/**
 * 
 */
export declare const COLOR_BGR5552BGRA: ColorConversionCodes // initializer: = 28

/**
 * 
 */
export declare const COLOR_BGR5552RGBA: ColorConversionCodes // initializer: = 29

/**
 * 
 */
export declare const COLOR_GRAY2BGR555: ColorConversionCodes // initializer: = 30

/**
 * 
 */
export declare const COLOR_BGR5552GRAY: ColorConversionCodes // initializer: = 31

/**
 * 
 */
export declare const COLOR_BGR2XYZ: ColorConversionCodes // initializer: = 32

/**
 * 
 */
export declare const COLOR_RGB2XYZ: ColorConversionCodes // initializer: = 33

/**
 * 
 */
export declare const COLOR_XYZ2BGR: ColorConversionCodes // initializer: = 34

/**
 * 
 */
export declare const COLOR_XYZ2RGB: ColorConversionCodes // initializer: = 35

/**
 * 
 */
export declare const COLOR_BGR2YCrCb: ColorConversionCodes // initializer: = 36

/**
 * 
 */
export declare const COLOR_RGB2YCrCb: ColorConversionCodes // initializer: = 37

/**
 * 
 */
export declare const COLOR_YCrCb2BGR: ColorConversionCodes // initializer: = 38

/**
 * 
 */
export declare const COLOR_YCrCb2RGB: ColorConversionCodes // initializer: = 39

/**
 * 
 */
export declare const COLOR_BGR2HSV: ColorConversionCodes // initializer: = 40

/**
 * 
 */
export declare const COLOR_RGB2HSV: ColorConversionCodes // initializer: = 41

/**
 * 
 */
export declare const COLOR_BGR2Lab: ColorConversionCodes // initializer: = 44

/**
 * 
 */
export declare const COLOR_RGB2Lab: ColorConversionCodes // initializer: = 45

/**
 * 
 */
export declare const COLOR_BGR2Luv: ColorConversionCodes // initializer: = 50

/**
 * 
 */
export declare const COLOR_RGB2Luv: ColorConversionCodes // initializer: = 51

/**
 * 
 */
export declare const COLOR_BGR2HLS: ColorConversionCodes // initializer: = 52

/**
 * 
 */
export declare const COLOR_RGB2HLS: ColorConversionCodes // initializer: = 53

/**
 * 
 */
export declare const COLOR_HSV2BGR: ColorConversionCodes // initializer: = 54

/**
 * 
 */
export declare const COLOR_HSV2RGB: ColorConversionCodes // initializer: = 55

/**
 * 
 */
export declare const COLOR_Lab2BGR: ColorConversionCodes // initializer: = 56

/**
 * 
 */
export declare const COLOR_Lab2RGB: ColorConversionCodes // initializer: = 57

/**
 * 
 */
export declare const COLOR_Luv2BGR: ColorConversionCodes // initializer: = 58

/**
 * 
 */
export declare const COLOR_Luv2RGB: ColorConversionCodes // initializer: = 59

/**
 * 
 */
export declare const COLOR_HLS2BGR: ColorConversionCodes // initializer: = 60

/**
 * 
 */
export declare const COLOR_HLS2RGB: ColorConversionCodes // initializer: = 61

/**
 * 
 */
export declare const COLOR_BGR2HSV_FULL: ColorConversionCodes // initializer: = 66

/**
 * 
 */
export declare const COLOR_RGB2HSV_FULL: ColorConversionCodes // initializer: = 67

/**
 * 
 */
export declare const COLOR_BGR2HLS_FULL: ColorConversionCodes // initializer: = 68

/**
 * 
 */
export declare const COLOR_RGB2HLS_FULL: ColorConversionCodes // initializer: = 69

/**
 * 
 */
export declare const COLOR_HSV2BGR_FULL: ColorConversionCodes // initializer: = 70

/**
 * 
 */
export declare const COLOR_HSV2RGB_FULL: ColorConversionCodes // initializer: = 71

/**
 * 
 */
export declare const COLOR_HLS2BGR_FULL: ColorConversionCodes // initializer: = 72

/**
 * 
 */
export declare const COLOR_HLS2RGB_FULL: ColorConversionCodes // initializer: = 73

/**
 * 
 */
export declare const COLOR_LBGR2Lab: ColorConversionCodes // initializer: = 74

/**
 * 
 */
export declare const COLOR_LRGB2Lab: ColorConversionCodes // initializer: = 75

/**
 * 
 */
export declare const COLOR_LBGR2Luv: ColorConversionCodes // initializer: = 76

/**
 * 
 */
export declare const COLOR_LRGB2Luv: ColorConversionCodes // initializer: = 77

/**
 * 
 */
export declare const COLOR_Lab2LBGR: ColorConversionCodes // initializer: = 78

/**
 * 
 */
export declare const COLOR_Lab2LRGB: ColorConversionCodes // initializer: = 79

/**
 * 
 */
export declare const COLOR_Luv2LBGR: ColorConversionCodes // initializer: = 80

/**
 * 
 */
export declare const COLOR_Luv2LRGB: ColorConversionCodes // initializer: = 81

/**
 * 
 */
export declare const COLOR_BGR2YUV: ColorConversionCodes // initializer: = 82

/**
 * 
 */
export declare const COLOR_RGB2YUV: ColorConversionCodes // initializer: = 83

/**
 * 
 */
export declare const COLOR_YUV2BGR: ColorConversionCodes // initializer: = 84

/**
 * 
 */
export declare const COLOR_YUV2RGB: ColorConversionCodes // initializer: = 85

/**
 * 
 */
export declare const COLOR_YUV2RGB_NV12: ColorConversionCodes // initializer: = 90

/**
 * 
 */
export declare const COLOR_YUV2BGR_NV12: ColorConversionCodes // initializer: = 91

/**
 * 
 */
export declare const COLOR_YUV2RGB_NV21: ColorConversionCodes // initializer: = 92

/**
 * 
 */
export declare const COLOR_YUV2BGR_NV21: ColorConversionCodes // initializer: = 93

/**
 * 
 */
export declare const COLOR_YUV420sp2RGB: ColorConversionCodes // initializer: = COLOR_YUV2RGB_NV21

/**
 * 
 */
export declare const COLOR_YUV420sp2BGR: ColorConversionCodes // initializer: = COLOR_YUV2BGR_NV21

/**
 * 
 */
export declare const COLOR_YUV2RGBA_NV12: ColorConversionCodes // initializer: = 94

/**
 * 
 */
export declare const COLOR_YUV2BGRA_NV12: ColorConversionCodes // initializer: = 95

/**
 * 
 */
export declare const COLOR_YUV2RGBA_NV21: ColorConversionCodes // initializer: = 96

/**
 * 
 */
export declare const COLOR_YUV2BGRA_NV21: ColorConversionCodes // initializer: = 97

/**
 * 
 */
export declare const COLOR_YUV420sp2RGBA: ColorConversionCodes // initializer: = COLOR_YUV2RGBA_NV21

/**
 * 
 */
export declare const COLOR_YUV420sp2BGRA: ColorConversionCodes // initializer: = COLOR_YUV2BGRA_NV21

/**
 * 
 */
export declare const COLOR_YUV2RGB_YV12: ColorConversionCodes // initializer: = 98

/**
 * 
 */
export declare const COLOR_YUV2BGR_YV12: ColorConversionCodes // initializer: = 99

/**
 * 
 */
export declare const COLOR_YUV2RGB_IYUV: ColorConversionCodes // initializer: = 100

/**
 * 
 */
export declare const COLOR_YUV2BGR_IYUV: ColorConversionCodes // initializer: = 101

/**
 * 
 */
export declare const COLOR_YUV2RGB_I420: ColorConversionCodes // initializer: = COLOR_YUV2RGB_IYUV

/**
 * 
 */
export declare const COLOR_YUV2BGR_I420: ColorConversionCodes // initializer: = COLOR_YUV2BGR_IYUV

/**
 * 
 */
export declare const COLOR_YUV420p2RGB: ColorConversionCodes // initializer: = COLOR_YUV2RGB_YV12

/**
 * 
 */
export declare const COLOR_YUV420p2BGR: ColorConversionCodes // initializer: = COLOR_YUV2BGR_YV12

/**
 * 
 */
export declare const COLOR_YUV2RGBA_YV12: ColorConversionCodes // initializer: = 102

/**
 * 
 */
export declare const COLOR_YUV2BGRA_YV12: ColorConversionCodes // initializer: = 103

/**
 * 
 */
export declare const COLOR_YUV2RGBA_IYUV: ColorConversionCodes // initializer: = 104

/**
 * 
 */
export declare const COLOR_YUV2BGRA_IYUV: ColorConversionCodes // initializer: = 105

/**
 * 
 */
export declare const COLOR_YUV2RGBA_I420: ColorConversionCodes // initializer: = COLOR_YUV2RGBA_IYUV

/**
 * 
 */
export declare const COLOR_YUV2BGRA_I420: ColorConversionCodes // initializer: = COLOR_YUV2BGRA_IYUV

/**
 * 
 */
export declare const COLOR_YUV420p2RGBA: ColorConversionCodes // initializer: = COLOR_YUV2RGBA_YV12

/**
 * 
 */
export declare const COLOR_YUV420p2BGRA: ColorConversionCodes // initializer: = COLOR_YUV2BGRA_YV12

/**
 * 
 */
export declare const COLOR_YUV2GRAY_420: ColorConversionCodes // initializer: = 106

/**
 * 
 */
export declare const COLOR_YUV2GRAY_NV21: ColorConversionCodes // initializer: = COLOR_YUV2GRAY_420

/**
 * 
 */
export declare const COLOR_YUV2GRAY_NV12: ColorConversionCodes // initializer: = COLOR_YUV2GRAY_420

/**
 * 
 */
export declare const COLOR_YUV2GRAY_YV12: ColorConversionCodes // initializer: = COLOR_YUV2GRAY_420

/**
 * 
 */
export declare const COLOR_YUV2GRAY_IYUV: ColorConversionCodes // initializer: = COLOR_YUV2GRAY_420

/**
 * 
 */
export declare const COLOR_YUV2GRAY_I420: ColorConversionCodes // initializer: = COLOR_YUV2GRAY_420

/**
 * 
 */
export declare const COLOR_YUV420sp2GRAY: ColorConversionCodes // initializer: = COLOR_YUV2GRAY_420

/**
 * 
 */
export declare const COLOR_YUV420p2GRAY: ColorConversionCodes // initializer: = COLOR_YUV2GRAY_420

/**
 * 
 */
export declare const COLOR_YUV2RGB_UYVY: ColorConversionCodes // initializer: = 107

/**
 * 
 */
export declare const COLOR_YUV2BGR_UYVY: ColorConversionCodes // initializer: = 108

/**
 * 
 */
export declare const COLOR_YUV2RGB_Y422: ColorConversionCodes // initializer: = COLOR_YUV2RGB_UYVY

/**
 * 
 */
export declare const COLOR_YUV2BGR_Y422: ColorConversionCodes // initializer: = COLOR_YUV2BGR_UYVY

/**
 * 
 */
export declare const COLOR_YUV2RGB_UYNV: ColorConversionCodes // initializer: = COLOR_YUV2RGB_UYVY

/**
 * 
 */
export declare const COLOR_YUV2BGR_UYNV: ColorConversionCodes // initializer: = COLOR_YUV2BGR_UYVY

/**
 * 
 */
export declare const COLOR_YUV2RGBA_UYVY: ColorConversionCodes // initializer: = 111

/**
 * 
 */
export declare const COLOR_YUV2BGRA_UYVY: ColorConversionCodes // initializer: = 112

/**
 * 
 */
export declare const COLOR_YUV2RGBA_Y422: ColorConversionCodes // initializer: = COLOR_YUV2RGBA_UYVY

/**
 * 
 */
export declare const COLOR_YUV2BGRA_Y422: ColorConversionCodes // initializer: = COLOR_YUV2BGRA_UYVY

/**
 * 
 */
export declare const COLOR_YUV2RGBA_UYNV: ColorConversionCodes // initializer: = COLOR_YUV2RGBA_UYVY

/**
 * 
 */
export declare const COLOR_YUV2BGRA_UYNV: ColorConversionCodes // initializer: = COLOR_YUV2BGRA_UYVY

/**
 * 
 */
export declare const COLOR_YUV2RGB_YUY2: ColorConversionCodes // initializer: = 115

/**
 * 
 */
export declare const COLOR_YUV2BGR_YUY2: ColorConversionCodes // initializer: = 116

/**
 * 
 */
export declare const COLOR_YUV2RGB_YVYU: ColorConversionCodes // initializer: = 117

/**
 * 
 */
export declare const COLOR_YUV2BGR_YVYU: ColorConversionCodes // initializer: = 118

/**
 * 
 */
export declare const COLOR_YUV2RGB_YUYV: ColorConversionCodes // initializer: = COLOR_YUV2RGB_YUY2

/**
 * 
 */
export declare const COLOR_YUV2BGR_YUYV: ColorConversionCodes // initializer: = COLOR_YUV2BGR_YUY2

/**
 * 
 */
export declare const COLOR_YUV2RGB_YUNV: ColorConversionCodes // initializer: = COLOR_YUV2RGB_YUY2

/**
 * 
 */
export declare const COLOR_YUV2BGR_YUNV: ColorConversionCodes // initializer: = COLOR_YUV2BGR_YUY2

/**
 * 
 */
export declare const COLOR_YUV2RGBA_YUY2: ColorConversionCodes // initializer: = 119

/**
 * 
 */
export declare const COLOR_YUV2BGRA_YUY2: ColorConversionCodes // initializer: = 120

/**
 * 
 */
export declare const COLOR_YUV2RGBA_YVYU: ColorConversionCodes // initializer: = 121

/**
 * 
 */
export declare const COLOR_YUV2BGRA_YVYU: ColorConversionCodes // initializer: = 122

/**
 * 
 */
export declare const COLOR_YUV2RGBA_YUYV: ColorConversionCodes // initializer: = COLOR_YUV2RGBA_YUY2

/**
 * 
 */
export declare const COLOR_YUV2BGRA_YUYV: ColorConversionCodes // initializer: = COLOR_YUV2BGRA_YUY2

/**
 * 
 */
export declare const COLOR_YUV2RGBA_YUNV: ColorConversionCodes // initializer: = COLOR_YUV2RGBA_YUY2

/**
 * 
 */
export declare const COLOR_YUV2BGRA_YUNV: ColorConversionCodes // initializer: = COLOR_YUV2BGRA_YUY2

/**
 * 
 */
export declare const COLOR_YUV2GRAY_UYVY: ColorConversionCodes // initializer: = 123

/**
 * 
 */
export declare const COLOR_YUV2GRAY_YUY2: ColorConversionCodes // initializer: = 124

/**
 * 
 */
export declare const COLOR_YUV2GRAY_Y422: ColorConversionCodes // initializer: = COLOR_YUV2GRAY_UYVY

/**
 * 
 */
export declare const COLOR_YUV2GRAY_UYNV: ColorConversionCodes // initializer: = COLOR_YUV2GRAY_UYVY

/**
 * 
 */
export declare const COLOR_YUV2GRAY_YVYU: ColorConversionCodes // initializer: = COLOR_YUV2GRAY_YUY2

/**
 * 
 */
export declare const COLOR_YUV2GRAY_YUYV: ColorConversionCodes // initializer: = COLOR_YUV2GRAY_YUY2

/**
 * 
 */
export declare const COLOR_YUV2GRAY_YUNV: ColorConversionCodes // initializer: = COLOR_YUV2GRAY_YUY2

/**
 * 
 */
export declare const COLOR_RGBA2mRGBA: ColorConversionCodes // initializer: = 125

/**
 * 
 */
export declare const COLOR_mRGBA2RGBA: ColorConversionCodes // initializer: = 126

/**
 * 
 */
export declare const COLOR_RGB2YUV_I420: ColorConversionCodes // initializer: = 127

/**
 * 
 */
export declare const COLOR_BGR2YUV_I420: ColorConversionCodes // initializer: = 128

/**
 * 
 */
export declare const COLOR_RGB2YUV_IYUV: ColorConversionCodes // initializer: = COLOR_RGB2YUV_I420

/**
 * 
 */
export declare const COLOR_BGR2YUV_IYUV: ColorConversionCodes // initializer: = COLOR_BGR2YUV_I420

/**
 * 
 */
export declare const COLOR_RGBA2YUV_I420: ColorConversionCodes // initializer: = 129

/**
 * 
 */
export declare const COLOR_BGRA2YUV_I420: ColorConversionCodes // initializer: = 130

/**
 * 
 */
export declare const COLOR_RGBA2YUV_IYUV: ColorConversionCodes // initializer: = COLOR_RGBA2YUV_I420

/**
 * 
 */
export declare const COLOR_BGRA2YUV_IYUV: ColorConversionCodes // initializer: = COLOR_BGRA2YUV_I420

/**
 * 
 */
export declare const COLOR_RGB2YUV_YV12: ColorConversionCodes // initializer: = 131

/**
 * 
 */
export declare const COLOR_BGR2YUV_YV12: ColorConversionCodes // initializer: = 132

/**
 * 
 */
export declare const COLOR_RGBA2YUV_YV12: ColorConversionCodes // initializer: = 133

/**
 * 
 */
export declare const COLOR_BGRA2YUV_YV12: ColorConversionCodes // initializer: = 134

/**
 * 
 */
export declare const COLOR_BayerBG2BGR: ColorConversionCodes // initializer: = 46

/**
 * 
 */
export declare const COLOR_BayerGB2BGR: ColorConversionCodes // initializer: = 47

/**
 * 
 */
export declare const COLOR_BayerRG2BGR: ColorConversionCodes // initializer: = 48

/**
 * 
 */
export declare const COLOR_BayerGR2BGR: ColorConversionCodes // initializer: = 49

/**
 * 
 */
export declare const COLOR_BayerBG2RGB: ColorConversionCodes // initializer: = COLOR_BayerRG2BGR

/**
 * 
 */
export declare const COLOR_BayerGB2RGB: ColorConversionCodes // initializer: = COLOR_BayerGR2BGR

/**
 * 
 */
export declare const COLOR_BayerRG2RGB: ColorConversionCodes // initializer: = COLOR_BayerBG2BGR

/**
 * 
 */
export declare const COLOR_BayerGR2RGB: ColorConversionCodes // initializer: = COLOR_BayerGB2BGR

/**
 * 
 */
export declare const COLOR_BayerBG2GRAY: ColorConversionCodes // initializer: = 86

/**
 * 
 */
export declare const COLOR_BayerGB2GRAY: ColorConversionCodes // initializer: = 87

/**
 * 
 */
export declare const COLOR_BayerRG2GRAY: ColorConversionCodes // initializer: = 88

/**
 * 
 */
export declare const COLOR_BayerGR2GRAY: ColorConversionCodes // initializer: = 89

/**
 * 
 */
export declare const COLOR_BayerBG2BGR_VNG: ColorConversionCodes // initializer: = 62

/**
 * 
 */
export declare const COLOR_BayerGB2BGR_VNG: ColorConversionCodes // initializer: = 63

/**
 * 
 */
export declare const COLOR_BayerRG2BGR_VNG: ColorConversionCodes // initializer: = 64

/**
 * 
 */
export declare const COLOR_BayerGR2BGR_VNG: ColorConversionCodes // initializer: = 65

/**
 * 
 */
export declare const COLOR_BayerBG2RGB_VNG: ColorConversionCodes // initializer: = COLOR_BayerRG2BGR_VNG

/**
 * 
 */
export declare const COLOR_BayerGB2RGB_VNG: ColorConversionCodes // initializer: = COLOR_BayerGR2BGR_VNG

/**
 * 
 */
export declare const COLOR_BayerRG2RGB_VNG: ColorConversionCodes // initializer: = COLOR_BayerBG2BGR_VNG

/**
 * 
 */
export declare const COLOR_BayerGR2RGB_VNG: ColorConversionCodes // initializer: = COLOR_BayerGB2BGR_VNG

/**
 * 
 */
export declare const COLOR_BayerBG2BGR_EA: ColorConversionCodes // initializer: = 135

/**
 * 
 */
export declare const COLOR_BayerGB2BGR_EA: ColorConversionCodes // initializer: = 136

/**
 * 
 */
export declare const COLOR_BayerRG2BGR_EA: ColorConversionCodes // initializer: = 137

/**
 * 
 */
export declare const COLOR_BayerGR2BGR_EA: ColorConversionCodes // initializer: = 138

/**
 * 
 */
export declare const COLOR_BayerBG2RGB_EA: ColorConversionCodes // initializer: = COLOR_BayerRG2BGR_EA

/**
 * 
 */
export declare const COLOR_BayerGB2RGB_EA: ColorConversionCodes // initializer: = COLOR_BayerGR2BGR_EA

/**
 * 
 */
export declare const COLOR_BayerRG2RGB_EA: ColorConversionCodes // initializer: = COLOR_BayerBG2BGR_EA

/**
 * 
 */
export declare const COLOR_BayerGR2RGB_EA: ColorConversionCodes // initializer: = COLOR_BayerGB2BGR_EA

/**
 * 
 */
export declare const COLOR_BayerBG2BGRA: ColorConversionCodes // initializer: = 139

/**
 * 
 */
export declare const COLOR_BayerGB2BGRA: ColorConversionCodes // initializer: = 140

/**
 * 
 */
export declare const COLOR_BayerRG2BGRA: ColorConversionCodes // initializer: = 141

/**
 * 
 */
export declare const COLOR_BayerGR2BGRA: ColorConversionCodes // initializer: = 142

/**
 * 
 */
export declare const COLOR_BayerBG2RGBA: ColorConversionCodes // initializer: = COLOR_BayerRG2BGRA

/**
 * 
 */
export declare const COLOR_BayerGB2RGBA: ColorConversionCodes // initializer: = COLOR_BayerGR2BGRA

/**
 * 
 */
export declare const COLOR_BayerRG2RGBA: ColorConversionCodes // initializer: = COLOR_BayerBG2BGRA

/**
 * 
 */
export declare const COLOR_BayerGR2RGBA: ColorConversionCodes // initializer: = COLOR_BayerGB2BGRA

/**
 * 
 */
export declare const COLOR_COLORCVT_MAX: ColorConversionCodes // initializer: = 143

/**
 * the color conversion codes 
 * 
 * [Color conversions](#de/d25/imgproc_color_conversions})
 * 
 */
export type ColorConversionCodes = any

