const BackToTop = () => {
  
    const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center  mt-10 mb-5">
      <img
        onClick={scrollToTop}
        className="w-12 cursor-pointer"
        src="/upward-arrow.png"
        alt="back to top"
      ></img>
    </div>
  );
};

export default BackToTop;
