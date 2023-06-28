import { Link } from 'react-router-dom';

function Notfound() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center text-2xl">
        <h1 className="mb-4">404</h1>
        <p className="mb-6">You&apos;re lost :_(</p>
        <Link to="/" className="shadow-lg p-3 rounded-lg text-lg text-teal-800">
          Let&apos;s get back home
        </Link>
      </div>
    </div>
  );
}

export default Notfound;
