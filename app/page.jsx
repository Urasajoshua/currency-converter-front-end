"use client"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Home() {

  const [currencies, setCurrencies] = useState([])
  const [fromCurrency, SetFromCurrency] = useState('USD')
  const [toCurrency, SetToCurrency] = useState('TZS')
  const [amount, SetAmount] = useState('')
  const [convertedResult, SetConvertedResult] = useState('')


  useEffect(
    () => {
      axios.get('http://localhost:8000/').then(
        response => setCurrencies(response.data)
      ).catch(error => console.error('error fetching currencies:',error))
    }, []
  )

  const convertCurrency = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/${fromCurrency}/${toCurrency}/${amount}`);
      SetConvertedResult(response.data.converted_amount);
      console.log(response.data['converted_amount']);
    } catch (error) {
      console.error('error converting currency', error);
    }
  };
  
  return (
    <div className="container flex justify-center items-center h-[100vh]">
      <div className="bg-blend-soft-light py-5 border border-3 rounded-3xl shadow-lg px-5">
        <h1 className="text-center mb-5">Forex Currency Convertor</h1>
        <div className="flex justify-between">
          <div className="px-3">
            <h3>from</h3>
            <select className="mb-3 w-24 h-10 rounded-md bg-black text-white" name="" id="" onChange={e => SetFromCurrency(e.target.value)}>
              {currencies.map(currency => <option className="text-white font-extrabold" key={currency.code} value={currency.code}>{currency.code}</option>)}
            </select>
          </div>
          <div className="px-3">
            <h3>to</h3>
            <select className="mb-3 w-24 h-10 rounded-md bg-black text-white " name="" id="" onChange={e => SetToCurrency(e.target.value)}>
              {currencies.map(currency => <option className="text-white font-extrabold" key={currency.code} value={currency.code}>{currency.code}</option>)}
            </select>
          </div>
        </div>

        <div className="px-3 mt-3 mb-3">
          <h3>Amount</h3>
          <input type="" className="mb-3 border rounded-md bg-slate-300 h-12" onChange={e => SetAmount(e.target.value)}/><br/>
          <button className="w-32 rounded-2xl bg-blue-500 text-white py-4 px-6" onClick={convertCurrency}>Convert</button>

        </div>
        {convertedResult && <p className="text-3xl">{amount} {fromCurrency} = {convertedResult} {toCurrency}</p>}
      </div>

    </div>
  )
}
