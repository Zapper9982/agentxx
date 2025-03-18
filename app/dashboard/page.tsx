'use client'
import React, { useState } from 'react'
import { URLInputForm } from '../components/updatecontent/URLform'

const [url,setUrl] = useState('');
const [loading , setLoading] = useState(false);


type Props = {}

const page = (props: Props) => {
  return (
    <URLInputForm/>

  )
}

export default page