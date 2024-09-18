import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import CustomButton from '../Button/Button'
import FormField from '../FormField/FormField';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
    deadlineError:''
  });

  const handleFormFieldChange = (fieldName, e) => {
    if(fieldName=='deadline'){
      const inputValue = e.target.value;
      const currentDate = new Date();
      const selectedDate = new Date(inputValue);
    
      if (selectedDate <= currentDate) {
        setForm({ ...form, [fieldName]: inputValue, deadlineError: 'Please select a future date' });
      } else {
        setForm({ ...form, [fieldName]: inputValue, deadlineError: '' });
      }
    }else{
      setForm({ ...form, [fieldName]: e.target.value })

    }
   }

  const handleSubmit = async (e) => {
    e.preventDefault();
   
  
 }

  return (
    <div className="bg-white flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Create a Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />


        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
            error={form.deadlineError}
          />
        </div>

        <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#8C6DFD]"
          />
        </div>
      </form>
    </div>
  )
}

export default CreateCampaign