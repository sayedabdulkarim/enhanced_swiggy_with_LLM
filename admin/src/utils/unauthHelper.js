function isMobile() {
  //window way
  // const isMobile = window.innerWidth < 768; //
  // return isMobile;

  //userAgent way
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export { isMobile };
