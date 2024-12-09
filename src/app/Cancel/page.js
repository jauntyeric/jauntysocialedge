import Link from 'next/link'

export default function Cancel() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Payment Cancelled</h2>
        <p className="mb-4">Your payment was cancelled. No charges were made.</p>
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
