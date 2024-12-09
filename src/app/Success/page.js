import Link from 'next/link'

export default function Success() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Payment Successful!</h2>
        <p className="mb-4">Thank you for your purchase.</p>
        <Link 
          href="/" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}
