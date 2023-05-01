function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-100 p-4 dark:bg-gray-900 sm:p-6">
      <div className="container mx-auto self-end sm:flex sm:items-center sm:justify-between">
        <span className="mx-auto text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          © 2023{' '}
          <a href="#" className="hover:text-teal-700 font-bold">
            Paper™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
