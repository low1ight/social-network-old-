 export let getUsersSelector = (state) => {
    return state.findUsersPage.users
};
export let maxUsersOnPageSelector = (state) => {
    return state.findUsersPage.maxUsersOnPage
};
export let userCountSelector = (state) => {
    return state.findUsersPage.userPageCount
};
export let currentPageSelector = (state) => {
    return state.findUsersPage.currentPage
};
export let isFetchingSelector = (state) => {
    return state.findUsersPage.isFetching
};
export let followingProgressSelector = (state) => {
    return state.findUsersPage.followingInProgress
};
export let portionSizeSelector = (state) => {
    return state.findUsersPage.portionSize
}