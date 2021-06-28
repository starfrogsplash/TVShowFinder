
import { getUniqueCast} from './getUniqueCast'

const mockCastData = {
  data: [
    {
      person:{id: 1, name:'john'}
    },
    {
      person:{id: 1, name:'john'}
    },
    {
      person:{id: 2, name:'katie'}
    },
]}

it('returns an array of unique cast members (removing duplicates)', () => {

  const result = [
    {id: 1, name:'john'},
    {id: 2, name:'katie'}
  ]

  const getUniquePageViewsResult = getUniqueCast(mockCastData)
  expect(getUniquePageViewsResult).toEqual(result)
})

