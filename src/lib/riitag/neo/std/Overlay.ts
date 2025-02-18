import { PUBLIC } from '@/lib/constants/filePaths'
import ModuleBase from '../ModuleBase'
import Canvas from 'canvas'
import path from 'node:path'
import fs from 'node:fs'
import logger from '@/lib/logger'
import { user } from '@prisma/client'

export default class Overlay extends ModuleBase {
  img: string

  constructor (overlay) {
    super()

    this.img = overlay.overlay_img
  }

  async render (ctx: Canvas.CanvasRenderingContext2D, _: user): Promise<void> {
    const imgPath = path.resolve(PUBLIC.OVERLAY_IMAGE, this.img)

    if (!fs.existsSync(imgPath)) {
      logger.error(`Overlay image does not exist: ${imgPath}`)
      return
    }

    const image = await Canvas.loadImage(imgPath)
    ctx.drawImage(image, 0, 0)
  }
}
