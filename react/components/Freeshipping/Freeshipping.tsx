import React from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm';
import styles from './styles.css';
import { pathOr } from 'ramda';
import { FormattedPrice } from 'vtex.formatted-price'

interface FreeShippingProps {
    _envio: number;
    icon: string;
    prom: string;
    success: string;
}

const FreeShipping = ({ _envio, icon, prom, success }: FreeShippingProps) => {
    const UseOrderForm = useOrderForm();
    let totalizer: any = pathOr([], ['orderForm', 'value'], UseOrderForm);
    let delivery: any = pathOr([], ['orderForm', 'shipping', 'deliveryOptions', 0, 'price'], UseOrderForm);
    delivery = delivery / 100;
    totalizer = totalizer / 100;
    totalizer = totalizer - delivery
    let valid: any = false;
    let restaEnvio: any = 0;



    if (_envio > totalizer) {
        valid = true;
        restaEnvio = _envio - totalizer;
    } else {
        restaEnvio = totalizer - _envio;
    }

    restaEnvio += '';
    var x = restaEnvio.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    const result: any = x1 + '' + x2;
    var rgx = /(\d+)(\d{3})/;
    var missing: any = _envio - result;

    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + "." + '$2');
    }

    const percentageCompleted = Math.floor((missing / _envio) * 100);
    const percentageCompletedLeft = percentageCompleted - (percentageCompleted * 0.11);


    return (
        <div className={styles.containerMain}>
            {valid == true ?
                <div className={`block ${styles.containerDeliveryPay}`}>
                    <div className={styles.containerDeliveryText}>
                        <div className={styles.textAddSend}> ¡Te falta <FormattedPrice value={result} /> {prom} </div>
                    </div>
                    <div>
                        <div className={`block ${styles.price__progress}`}>
                            <div className={styles.progresvalues}>
                                <span>{percentageCompleted}%</span>
                                <img src={icon} style={{ left: `${percentageCompletedLeft}%` }} />
                                <span> 100% </span>
                            </div>

                            <progress className={`${styles.progressBar}`} max={_envio} value={missing} />
                        </div>

                    </div>
                </div>
                :
                <div className={styles.containerDeliveryFree}>
                    <p>{success}</p>
                </div>}


        </div>
    )
}

FreeShipping.defaultProps = {
    _envio: 199000,
    icon: 'https://quest.vtexassets.com/assets/vtex.file-manager-graphql/images/3a698dfd-8609-4397-839b-7fff5fe25bae___26773398fd77ba0fe2148c5df4d5ae27.png',
    prom: 'para obtener envío gratis!',
    success: '¡Felicidades Obtienes envío gratis!'
}

FreeShipping.getSchema = () => {
    return {
        title: 'FreeShipping',
        type: 'object',
        properties: {
            _envio: {
                title: 'Valor envio gratis ej. 170000',
                type: 'number'
            },
            icon: {
                title: 'url icono formato png, 40x40 debe incluir sombra y color del botón y icono',
                type: 'string'
            },
            prom: {
                title: 'Texto promocional ej. "para obtener envío gratis!"',
                type: 'string'
            },
            success: {
                title: 'Texto promocional completo ej. "¡Felicidades Obtienes envío gratis!"',
                type: 'string'
            },

        }
    }
}

export { FreeShipping }
