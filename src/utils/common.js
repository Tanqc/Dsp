// 	权限控制
export function AccessControl(permissionList, permissionVal) {
	// console.log(permissionList, permissionVal)
  let isAllow = false;
  permissionList && permissionList.map((item) => {
    if (item === permissionVal) {
      isAllow = true;
      return;
    }
  })
  return isAllow;
}
