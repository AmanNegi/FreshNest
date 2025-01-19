function Footer() {
  return (
    <footer className="text-gray-600 border-t-[1px] body-font">
      <div className="bg-gray-100">
        <div className="container mx-auto py-8 px-8 flex flex-row items-center justify-center sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} FreshNest
          </p>
          <div className="flex-grow"></div>

          <div
            onClick={() => {
              const url = 'https://github.com/amannegi/freshnest';
              window.open(url, '_blank');
            }}
            className="flex flex-row items-center justify-center w-auto hover:scale-[1.025] transition-all duration-300 cursor-pointer"
          >
            <p className="px-4 py-[4px] mx-auto text-black text-opacity-80 border border-black border-opacity-60 rounded-full flex flex-row items-center justify-center text-[12px]">
              <img className="h-[20px] w-[20px]" src="/github-mark.png" alt="" />
              <span className="w-2"></span>
              Proudly OpenSource
              <svg
                width="20"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 5L15.5 12L8.5 19"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
