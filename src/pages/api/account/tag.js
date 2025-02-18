import { ncWithSession } from '@/lib/routing'
import HTTP_CODE from '@/lib/constants/httpStatusCodes'
import { isBlank, isBoolean } from '@/lib/utils/utils'
import { isValidCoverRegion } from '@/lib/constants/forms/coverRegions'
import { isValidCoverType } from '@/lib/constants/forms/coverTypes'
import { isValidOverlay } from '@/lib/constants/forms/overlays'
import { BACKGROUNDS } from '@/lib/constants/forms/backgrounds'
import { isValidFlag } from '@/lib/constants/forms/flags'
import { isValidCoin } from '@/lib/constants/forms/coins'
import { isValidFont } from '@/lib/constants/forms/fonts'
import logger from '@/lib/logger'
import prisma from '@/lib/db'
import { renderTag } from '@/lib/riitag/neo/renderer'

async function updateTagSettings (request, response) {
  const {
    nameOnRiiTag,
    comment,
    coverRegion,
    coverType,
    showAvatar,
    showMii,
    overlay,
    background,
    flag,
    coin,
    font
  } = request.body
  const username = request.session?.username

  function validateFriendCode () {
    if (!request.body.comment) {
      return true
    }

    return true
  }

  if (!validateFriendCode()) {
    return response
      .status(HTTP_CODE.BAD_REQUEST)
      .send({ error: 'Invalid data' })
  }

  if (!username) {
    return response
      .status(HTTP_CODE.UNAUTHORIZED)
      .json({ error: 'Unauthorized' })
  }

  if (
    isBlank(nameOnRiiTag) ||
    isBlank(coverRegion) ||
    isBlank(coverType) ||
    isBlank(overlay) ||
    isBlank(background) ||
    isBlank(flag) ||
    isBlank(coin) ||
    isBlank(font) ||
    nameOnRiiTag.length > 20 ||
    comment.length > 50 ||
    !isValidCoverType(coverType) ||
    !isValidCoverRegion(coverRegion) ||
    !isValidOverlay(overlay) ||
    BACKGROUNDS.includes(background) === false ||
    !isValidFlag(flag) ||
    !isValidCoin(coin) ||
    !isValidFont(font) ||
    !isBoolean(showAvatar) ||
    !isBoolean(showMii)
  ) {
    return response
      .status(HTTP_CODE.BAD_REQUEST)
      .send({ error: 'Invalid data' })
  }

  try {
    const user = await prisma.user.update({
      where: {
        username
      },
      data: {
        display_name: nameOnRiiTag,
        cover_region: coverRegion,
        cover_type: coverType,
        comment: isBlank(comment) ? null : comment,
        overlay,
        background,
        flag,
        coin,
        font,
        show_avatar: +showAvatar,
        show_mii: +showMii
      }
    })
    await renderTag(user)
  } catch (error) {
    logger.error(error)
    return response
      .status(HTTP_CODE.BAD_REQUEST)
      .send({ error: 'Invalid data' })
  }

  return response.status(HTTP_CODE.OK).send()
}

const handler = ncWithSession().post(updateTagSettings)

export default handler
