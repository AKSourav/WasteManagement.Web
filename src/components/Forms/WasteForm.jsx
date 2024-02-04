import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import apiClient from '@/utils/apiClient';
import Spinner from '@/utils/Spinner/Spinner';

const WasteForm = ({ id }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState([
    { waste_type: '', price: '', weight: '', total_cost: '', image: null },
  ]);

  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(0);

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const sendEmailData = { items: [], collection_point_id: id }
      formData.forEach((item, index) => {
        const { image, ...rest } = item
        sendEmailData.items.push(rest);
      })
      console.log("sendEmailData:", sendEmailData);
      const { data } = await apiClient.post(`/api/pin_verify/${id}/`, sendEmailData);
      setTimer(30);
    } catch (error) {
      console.log(error);
      toast.error("FAiled");
    }
    setLoading(false);
  }

  useEffect(() => {
    let intervalId;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    // Clear interval on component unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timer]);


  // Sample data for waste types and their prices
  const wasteTypesData = [
    { id: 1, name: 'Plastic', price: 2.5 },
    { id: 2, name: 'Paper', price: 1.8 },
    { id: 3, name: 'Glass', price: 3.0 },
    // Add more waste types as needed
  ];


  const handleChange = (index, field, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index][field] = value;

    if (field === 'waste_type') {
      // Populate price based on selected waste type
      const selectedWasteType = wasteTypesData.find((type) => type.name === value);
      if (selectedWasteType) {
        updatedFormData[index].price = selectedWasteType.price.toFixed(2);
      }
    } else if (field === 'weight') {
      // Calculate total cost based on price and weight
      const price = parseFloat(updatedFormData[index].price);
      const weight = parseFloat(value);
      updatedFormData[index].total_cost = (price * weight).toFixed(2);
    }

    setFormData(updatedFormData);
  };

  const handleAddMore = () => {
    setFormData([...formData, { waste_type: '', price: '', weight: '', total_cost: '', image: null }]);
  };

  const handleImageChange = (index, e) => {
    const updatedFormData = [...formData];
    updatedFormData[index].image = e.target.files[0];
    setFormData(updatedFormData);
  };

  const handleRemove = (index) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);
  };

  const calculateTotalPrice = () => {
    return formData.reduce((total, data) => {
      return total + parseFloat(data.price) * parseFloat(data.weight);
    }, 0).toFixed(2);
  };

  const validateStep1 = () => {
    const step1Errors = [];
    formData.forEach((item, index) => {
      Object.entries(item).forEach(([key, value]) => {
        if (!value || value.length === 0) {
          toast.error(`${key} is required`);
          step1Errors.push({ index, field: key });
        }
      });
    });
    return step1Errors;
  };

  const handleNextStep = async () => {
    setError([]);
    if (currentStep === 1) {
      const step1Error = validateStep1();
      if (step1Error.length > 0) {
        setError(step1Error);
        return;
      }
    }
    setLoading(true);
    try {
      const sendEmailData = { items: [], collection_point_id: id }
      formData.forEach((item, index) => {
        const { image, ...rest } = item
        sendEmailData.items.push(rest);
      })
      console.log("sendEmailData:", sendEmailData);
      const { data } = await apiClient.post(`/api/pin_verify/${id}/`, sendEmailData);
      setCurrentStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.log(error);
      toast.error("FAiled");
    }
    setLoading(false);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleOtpInputChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    setError([]);
    try {
      const { } = await apiClient.get(`/api/pin_verify/${id}/`, {
        params: {
          otp: String(otp)
        }
      });

      const postData = new FormData();

      formData.forEach((dataObject, index) => {
        postData.append(`image${index}`, dataObject.image);
        postData.append(`price${index}`, dataObject.price);
        postData.append(`total_cost${index}`, dataObject.total_cost);
        postData.append(`waste_type${index}`, dataObject.waste_type);
        postData.append(`weight${index}`, dataObject.weight);
      });

      const { data } = await apiClient.post(`/api/records/${id}/`, postData);
      console.log("CloudData:", data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto mt-8 dark:bg-gray-800 p-4 rounded-md">
      {isLoading && <div className='fixed inset-0 w-full h-full'>
        <Spinner />
      </div>}
      <div style={{ height: '60vh' }} className="overflow-y-scroll">
        {currentStep === 1 && (
          <>
            {formData.map((data, index) => (
              <div key={index} className="mb-4 p-2 border border-gray-300 rounded flex flex-wrap">
                <div className="m-1 w-full md:w-1/3">
                  <label className="block text-sm font-medium text-gray-600">Waste Type</label>
                  <select
                    className={`m-1 p-2 w-full border rounded-md dark:bg-gray-700 ${error.some((e) => e.index === index && e.field === "waste_type") && (!data.waste_type || data.waste_type.length === 0) && `border-2 border-red-500`}`}
                    value={data.waste_type}
                    onChange={(e) => {
                      handleChange(index, 'waste_type', e.target.value);
                      handleChange(index, 'weight', 0);
                    }}
                    required // Adding the required attribute
                  >
                    <option value="" disabled>Select Waste Type</option>
                    {wasteTypesData.map((type) => (
                      <option key={type.id} value={type.name}>{type.name}</option>
                    ))}
                  </select>
                </div>
                <div className="m-1 w-full md:w-1/5">
                  <label className="block text-sm font-medium text-gray-600">Price (per gram)</label>
                  <input
                    type="text"
                    className={`outline-none m-1 p-2 w-full border rounded-md dark:bg-gray-700 ${error.some((e) => e.index === index && e.field === "price") && (!data.price || data.price.length === 0) && `border-2 border-red-500`}`}
                    value={data.price}
                    readOnly
                    required // Adding the required attribute
                  />
                </div>
                <div className="m-1 w-full md:w-1/5">
                  <label className="block text-sm font-medium text-gray-600">Weight (in grams)</label>
                  <input
                    type="text"
                    className={`m-1 p-2 w-full border rounded-md dark:bg-gray-700 ${error.some((e) => e.index === index && e.field === "weight") && (!data.weight || data.weight.length === 0) && `border-2 border-red-500`}`}
                    value={data.weight}
                    onChange={(e) => handleChange(index, 'weight', e.target.value)}
                    required // Adding the required attribute
                  />
                </div>
                <div className="m-1 w-full md:w-1/5">
                  <label className="block text-sm font-medium text-gray-600">Total Cost</label>
                  <input
                    type="text"
                    className={`m-1 p-2 w-full border rounded-md dark:bg-gray-700 ${error.some((e) => e.index === index && e.field === "total_cost") && (!data.total_cost || data.total_cost.length === 0) && `border-2 border-red-500`}`}
                    value={data.total_cost}
                    readOnly
                    required // Adding the required attribute
                  />
                </div>
                <div className="m-1 w-full md:w-1/5">
                  <label className="block text-sm font-medium text-gray-600">Image</label>
                  <input
                    type="file"
                    className={`m-1 p-2 w-full border rounded-md dark:bg-gray-700 ${error.some((e) => e.index === index && e.field === "image") && (!data.image || data.image.length === 0) && `border-2 border-red-500`}`}
                    accept="image/*"
                    onChange={(e) => handleImageChange(index, e)}
                    required // Adding the required attribute
                  />
                </div>
                <div className="m-1 mt-4 w-full text-center">
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 w-full">
              <button
                type="button"
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleAddMore}
              >
                Add More
              </button>
            </div>
          </>
        )}
        {currentStep === 2 && (
          <div className="otp-step">
            <label className="block text-sm font-medium text-gray-600">Enter OTP</label>
            <input
              type="text"
              className="mt-1 p-2 border rounded-md w-4/12 dark:bg-gray-700"
              value={otp}
              onChange={handleOtpInputChange}
            />
            <button
              type="button"
              className="px-4 py-2 mt-4 bg-blue-500 text-white rounded"
              onClick={handleOtpSubmit}
            >
              Submit OTP
            </button>
            <button
              type="button"
              className={`px-4 py-2 mt-4 rounded ${timer > 0 ? "bg-transparent text-black dark:text-white" : "bg-blue-500 text-white "}`}
              disabled={timer > 0}
              onClick={handleResendOtp}
            >
              {timer > 0 ? timer : "Resend OTP"}
            </button>
          </div>
        )}
      </div>
      {/* Total Price Display */}
      <div className="border-t-2 rounded fixed p-3 pt-0 bottom-1 right-0 left-0 flex justify-between items-center">
        <div className="mt-4 w-full">
          <p className="block text-base font-extrabold text-green-600">
            Total Price: <span className="text-grey-600 dark:text-white">&#x20B9; {calculateTotalPrice() || 0}</span>
          </p>
        </div>
        {/* Navigation Buttons */}
        <div className="mt-4 w-full flex justify-end items-center">
          {currentStep > 1 && (
            <button
              type="button"
              className="m-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handlePreviousStep}
            >
              Previous
            </button>
          )}
          {currentStep < 2 && (
            <button
              type="button"
              className="m-2 px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleNextStep}
            >
              Next
            </button>
          )}
          {currentStep === 2 && (
            <button
              type="button"
              className="m-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleOtpSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WasteForm;
