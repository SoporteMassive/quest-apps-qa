import React from "react";
import { useProduct } from 'vtex.product-context';

import styles from "./styles.css";

const FILTERED_SPECIFICATIONS = [
  "Cuidado de la Prenda"
];

const FILTERED_SPECIFICATIONS_WASHING = [ "Instrucciones de Lavado" ];

const HtmlSpecification = () => {
  //@ts-ignore
  const informacionproduct = useProduct();

  console.log("info", informacionproduct);

  const { specifications } =
    informacionproduct?.product?.specificationGroups?.find(
      ({ originalName }: any) => originalName === "allSpecifications"
    ) ?? { specification: [] };

  const especificaciones = specifications?.filter(
    ({ originalName }: any) => FILTERED_SPECIFICATIONS.includes(originalName)
  )[0]?.values[0];

  console.log("cuidados", especificaciones);

  const especificacionesWashing = specifications?.filter( ({ originalName }: any) =>
FILTERED_SPECIFICATIONS_WASHING.includes(originalName) )[0]?.values[0];



const format:any = especificaciones?.replace(/\n/g, "").replace(/\s{2,}/g, " ");

  return (
    <>
      {
        especificacionesWashing ? (
            (
              <div className={styles.SpecificationContainer}>
                <p className={styles.SpecificationTitle}>Instrucciones de lavado</p>
                <div className={styles.SpecificationContent}>
                  {especificacionesWashing}
                </div>
              </div>
            )
        ):
        (
            <div></div>
        )
      }
      {
        especificaciones ? (
            (
              <div className={styles.SpecificationContainer}>
                <p className={styles.SpecificationTitle} >Cuidado de la Prenda</p>
                <div>
                  <span dangerouslySetInnerHTML= {{ __html: format }} />
                </div>
              </div>
            )
        ):
        (
            <div></div>
        )
      }
    </>
  )
}

export { HtmlSpecification }
