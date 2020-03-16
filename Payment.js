import React from 'react';
/* 아임포트 모듈을 불러옵니다. */
import IMP from 'iamport-react-native';
/* 로딩 컴포넌트를 불러옵니다. */
import Loading from './Loading';

export default function Payment(props) {
    console.log(props)

    function callback(response) {
        props.navigation.navigate('PaymentResults', response)
        console.log('callback', response)
    }

    /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
    const data = {
        pg: 'html5_inicis',
        pay_method: 'card',
        name: '아임포트 결제데이터 분석',
        merchant_uid: `mid_${new Date().getTime()}`,
        amount: props.route.params['amount'],
        buyer_name: props.route.params['buyer_name'],
        buyer_tel: props.route.params['buyer_tel'],
        buyer_email: props.route.params['buyer_email'],
        buyer_addr: props.route.params['buyer_addr'],
        buyer_postcode: '06018',
        app_scheme: 'ispmobile',
        // m_redirect_url: 'https://admin.iamport.kr/payments/complete/mobile'
    };
    return (
        <IMP.Payment
            userCode={'imp10116320'}    // 가맹점 식별코드
            loading={<Loading />}   // 웹뷰 로딩 컴포넌트
            data={data}             // 결제 데이터
            callback={callback}     // 결제 종료 후 콜백
        />
    );
}
