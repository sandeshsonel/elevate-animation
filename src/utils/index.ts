import { HOW_ITS_WORK_EXPIRE } from '../config'

export const isExpired = (): boolean => {
  const expireDate = HOW_ITS_WORK_EXPIRE
  const expireTs = new Date(expireDate).getTime()

  return Date.now() > expireTs
}
