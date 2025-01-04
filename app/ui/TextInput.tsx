"use client"

export const TextInput = ({
    label,
    placeholder,
    type,
    input,
    value
}:{
    label: string;
    placeholder: string;
    type: any
    input: (value:any) => void;
    value: any
}) => {
    return<div>
      <label className="block mb-1 text-sm font-medium text-gray-900">{label}</label>
      <input onChange={(e)=>{input(e.target.value)}} type={type} value={value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder}>
      </input>
    </div>
}

