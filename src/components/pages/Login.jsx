const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col space-y-4 mx-auto w-[22rem] md:w-96  p-5 rounded-md bg-white/80 backdrop-blur-lg shadow-lg">
        <div className="flex justify-center">
          <h1 className="font-medium text-xl">ACCOUNT LOGIN</h1>
        </div>
        <form action="#" method="POST">
          <div className="flex flex-col space-y-4">
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="username@mail.com"
                required
              />
            </div>
            <div>
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="password"
                required
              />
              <a
                className="text-sm font-medium text-blue-500 hover:text-indigo-500"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300"
                required
              />
              <label for="remember" className="font-medium text-gray-900">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-cyan-500  to-blue-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
