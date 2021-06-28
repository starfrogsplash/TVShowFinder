
const getUniqueCast = (cast) => {
    const personMap = new Map()

    cast.data.forEach(cast => {
      personMap.set(cast.person.id, cast.person)
    })

     const uniqueCast = [...personMap.values()]
     return uniqueCast
}

export {
  getUniqueCast
}