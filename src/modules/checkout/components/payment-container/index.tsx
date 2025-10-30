import { PaymentSession } from "@medusajs/medusa"
import React, { useState } from "react"
import Button from "@/components/common/Button"
import { RadioGroup } from "@headlessui/react"

type PaymentContainerProps = {
  paymentSession: PaymentSession
  selectedPaymentOptionId: string | null
  disabled?: boolean
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentSession,
  selectedPaymentOptionId,
  disabled = false,
}) => {
  const [showPopup, setShowPopup] = useState(false)
  const [showUpiPopup, setShowUpiPopup] = useState(false) // Add state for UPI pop-up

  const [cardDetails, setCardDetails] = useState({
    cardName: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  })

  const handleRadioClick = () => {
    if (paymentSession.provider_id === "upi") {
      // Don't show pop-up for UPI
      return
    }
    setShowPopup(true)
    // Additional logic for handling radio button click if needed
  }

  const handleUpiRadioClick = () => {
    if (paymentSession.provider_id === "card") {
      // Don't show pop-up for UPI
      return
    }
    setShowUpiPopup(true) // Show UPI pop-up
    // Additional logic for handling radio button click if needed
  }

  const handleCloseClick = () => {
    setShowPopup(false)
    setShowUpiPopup(false) // Close UPI pop-up
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let filteredValue = value

    // Filter input based on field name
    if (name === "cardName") {
      // Only allow alphabetic characters and spaces for card holder's name
      filteredValue = value.replace(/[^a-zA-Z\s]/g, "")
    } else if (
      name === "cardNumber" ||
      name === "cvv" ||
      name === "expiryDate"
    ) {
      // Allow numerical characters and specific special characters for card number, CVV, and expiry date
      filteredValue = value.replace(/[^\d/-]/g, "")
    }

    setCardDetails((prev) => ({
      ...prev,
      [name]: filteredValue,
    }))
  }

  const handleConfirmClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation() // Prevent event propagation
    console.log("Card details:", cardDetails)
    // Additional logic for handling confirm button click
    setShowPopup(false) // Close the pop-up after confirming card details
    setShowUpiPopup(false) // Close the UPI pop-up after confirming details
  }

  return (
    <>
      <RadioGroup.Option
        key={paymentSession.id}
        value={paymentSession.provider_id}
      >
        <div className="flex items-center gap-x-2 text-small-regular cursor-pointer py-4 border rounded-lg px-8 mb-2 bg-rose-100 hover:shadow-greenLight hover:shadow-md">
          <input
            id="card"
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            disabled={disabled}
            onClick={() => handleRadioClick(paymentSession.provider_id)}
          />
          <label
            className="form-check-label flex items-center justify-between w-full"
            htmlFor="card"
          >
            <span className="font-semibold">Add Debit/Credit/ATM Card</span>
            <img
              className="h-10"
              src="https://ik.imagekit.io/ppje0kzhr/output-onlinegiftools%20(1).gif?updatedAt=1713516418575"
              alt=""
              style={{ filter: "drop-shadow(10px)" }}
            />

            {/* Insert image tags with Tailwind CSS classes here */}
          </label>
        </div>

        <div className="flex items-center gap-x-2 text-small-regular cursor-pointer py-4 border rounded-lg px-8 mb-2 bg-rose-100 hover:shadow-greenLight hover:shadow-md">
          <input
            id="upi"
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            disabled={disabled}
            onClick={() => handleUpiRadioClick(paymentSession.provider_id)}
          />
          <label
            className="flex items-center justify-between w-full"
            htmlFor="upi"
          >
            <span className="font-semibold"> UPI</span>
            <img
              className="h-8"
              src="https://ik.imagekit.io/ppje0kzhr/IMG.png?updatedAt=1713515058966"
              alt=""
              style={{ filter: "drop-shadow(10px)" }}
            />
            <div className="flex-grow"></div>
            <img
              className="h-10"
              src="https://ik.imagekit.io/ppje0kzhr/output-onlinegiftools.gif?updatedAt=1713514383060"
              alt=""
              style={{ filter: "drop-shadow(10px)" }}
            />
          </label>
        </div>

        <div className="flex items-center gap-x-2 text-small-regular cursor-pointer py-4 border rounded-lg px-8 mb-2 bg-rose-100 hover:shadow-greenLight hover:shadow-md">
          <input
            id="cod"
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            disabled={disabled}
          />
          <label
            className="form-check-label flex items-center justify-between w-full"
            htmlFor="cod"
          >
            <span className="font-semibold">Cash on Delivery</span>
            <img
              className="h-10"
              src="https://ik.imagekit.io/ppje0kzhr/gifs-de-delivery-5.gif?updatedAt=1713768037774"
              alt=""
              style={{ filter: "drop-shadow(10px)" }}
            />
          </label>
        </div>
        <br />
      </RadioGroup.Option>

      {/* Popup page for Debit/Credit/ATM Card */}
      {showPopup && paymentSession.provider_id !== "cod" && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={handleCloseClick}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg relative"
            style={{ width: "600px", height: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-0 right-0 m-4 p-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Card details */}
            <div>
              <label className="block mb-2" htmlFor="cardName">
                {" "}
                Card Holder Name:
              </label>
              <input
                id="cardName"
                type="text"
                name="cardName"
                value={cardDetails.cardName}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md px-3 py-2 mb-4"
              />
              <label className="block mb-2" htmlFor="cardNumber">
                Card Number:
              </label>
              <input
                id="cardNumber"
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md px-3 py-2 mb-4"
              />
              <label className="block mb-2" htmlFor="cvv">
                CVV:
              </label>
              <input
                id="cvv"
                type="text"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md px-3 py-2 mb-4"
              />
              <label className="block mb-2" htmlFor="expiryDate">
                Expiry Date:
              </label>
              <input
                id="expiryDate"
                type="text"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md px-3 py-2 mb-4"
              />
            </div>
            {/* Confirm button */}
            <Button
              type="button" // Set type to "button" to prevent form submission
              onClick={(e) => handleConfirmClick(e)}
              className="bg-orange-400 text-black font-bold py-2 px-4 rounded"
            >
              Confirm
            </Button>
          </div>
        </div>
      )}

      {/* Popup page for UPI */}
      {showUpiPopup && paymentSession.provider_id !== "cod" && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={handleCloseClick}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg relative"
            style={{ width: "600px", height: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-0 right-0 m-4 p-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* UPI details */}
            <div className="flex justify-center">
              <a href="upi://pay?pa=meetsathavara10@oksbi">
                <img
                  src="https://ik.imagekit.io/ppje0kzhr/WhatsApp%20Image%202024-04-19%20at%2013.01.23_cb3ea721%20(1).jpg?updatedAt=1713769899759"
                  alt=""
                  className="h-96 w-64"
                />
              </a>
            </div>
            {/* Confirm button */}
            <Button
              type="button"
              onClick={() => {
                window.location.href = "upi://pay?pa=meetsathavara10@oksbi"
              }}
              className="bg-orange-400 text-black font-bold py-2 px-4 rounded mt-6"
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default PaymentContainer
