import dynamic from "next/dynamic";
const DocTemplate = dynamic(() => import('@/Components/DocTemplate/DocTemplate'), {
  ssr: false,
});
import React from 'react'

function index() {
  return (
    <DocTemplate />
  )
}

export default index