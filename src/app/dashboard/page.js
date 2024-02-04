"use client"
import MainContent from '@/components/Dashboard/MainContent';
import withAuth from '@/utils/withAuth';
import React from 'react';

const Page = () => {
  return (
    <div>
      <MainContent />
    </div>
  )
}

export default withAuth(Page)