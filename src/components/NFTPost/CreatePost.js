import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../context';
import CustomButton from '../Button/Button'
import FormField from '../FormField/FormField';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    contract,
    account,
} = useStateContext()
  const [form, setForm] = useState({
    nftName: '',
    nftDesc: '',
    nftImage: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(account){

    }else{
      console.log("Sign in with your metamask")
    }

  }

  return (
    <div className="bg-white flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Create NFT Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="NFT Name*"
            placeholder="e.g: Cool Cat"
            inputType="text"
            value={form.nftName}
            handleChange={(e) => handleFormFieldChange('nftName', e)}
          />

        </div>

        <FormField
          labelName="NFT Description*"
          placeholder="Write a description"
          isTextArea
          value={form.nftDesc}
          handleChange={(e) => handleFormFieldChange('nftDesc', e)}
        />

        <FormField
          labelName="NFT image *"
          placeholder="Place image URL of your NFT"
          inputType="url"
          value={form.nftImage}
          handleChange={(e) => handleFormFieldChange('nftImage', e)}
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