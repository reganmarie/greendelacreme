import React from 'react';
import Lottie from "lottie-react";
import loading from './assets/images/loading.json';

export default function Loading() {
  return (
    <div className="w-32 mx-auto">
      <Lottie animationData={loading} />
    </div>
  )
}
