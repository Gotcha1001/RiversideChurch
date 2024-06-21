export default function ContactUs() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto py-8 p-3">
        <h1 className="text-3xl font-bold text-center mb-8 zoom">Contact Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Pastor Cedric Olivier */}
          <div className="bg-teal-500 p-4 rounded-lg text-center hover:shadow-xl transform hover:scale-105">
            <p className="font-bold">Pastor Cedric Olivier</p>
            <p>Phone Number: 0834487334</p>
            <p>Email: cedric@riversidechurch.org.za</p>
          </div>

          {/* Riverside Church */}
          <div className="bg-teal-800 p-4 rounded-lg text-center hover:shadow-xl transform hover:scale-105">
            <p className="font-bold">Riverside Church</p>
            <p>Email: info@riversidechurch.org.za</p>
          </div>

          {/* Pastor Louise Olivier */}
          <div className="bg-teal-500 p-4 rounded-lg text-center hover:shadow-xl transform hover:scale-105">
            <p className="font-bold">Pastor Louise Olivier</p>
            <p>Phone Number: 0834149502</p>
            <p>Email: cedwees@absamail.co.za</p>
          </div>

          {/* Church Leaders */}
          <div className="bg-teal-500 p-4 rounded-lg text-center hover:shadow-xl transform hover:scale-105">
            <p className="font-bold">Church Leaders</p>
            <p>Adrian Munsamy</p>
            <p>Phone Number: 0812406768</p>
            <p>Email: cedric@riversidechurch.org.za</p>
          </div>

          <div className="bg-teal-500 p-4 rounded-lg text-center hover:shadow-xl transform hover:scale-105">
            <p>Susan Greer</p>
            <p>Phone Number: 0764078773</p>
            <p>Email: susanlgreer@gmail.com</p>
          </div>

          <div className="bg-teal-500 p-4 rounded-lg text-center hover:shadow-xl transform hover:scale-105">
            <p>Charles Frankel</p>
            <p>Phone Number: 0828515700</p>
            <p>Email: charlesf@revtech.co.za</p>
          </div>
        </div>

        <div className="bg-slate-700 p-4 rounded-lg text-center mt-8 hover:shadow-xl transform hover:scale-105 zoom">
          <h1 className="text-2xl font-bold mb-4 zoom">Banking Details</h1>
          <p>Westville Assembly of God</p>
          <p>Std Bank Westville</p>
          <p>Acc no 053102800</p>
          <p>Branch code 045426</p>
        </div>
      </div>
    </div>
  );
}
