export const updateObjectOnArray = (array,objPropName,itemId,newObjProps) => {
    return array.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
};

export const countHandler = (contact) => {
    for (let keyName in contact) {
        if (contact[keyName] === null || contact[keyName] === "") continue;
        return true
    }
    return false
}