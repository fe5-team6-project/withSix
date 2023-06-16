import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Common from '../../components/design/main/Common';
import { styled } from 'styled-components';

export default function Home() {
    return (
        <>
            <Header />
            <Common page={''} />
            <Footer />
        </>
    );
}
