import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../shared/Loading/Loading";

function BrandsDetails() {
    const { brandId } = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [brandsDetails, setBrandsDetails] = useState(null);
    async function getSpecificBrand () {
      setIsLoading(true);
      const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
      const result = data.data;
      setBrandsDetails(result);
      setIsLoading(false);
    }
    useEffect(() => {
    getSpecificBrand();
    }, [])
  return (
    <>
            <div className="container">
      <div className="my-8 p-4">
        {brandsDetails && !isLoading ? (
          <div
            key={brandsDetails._id}
            className="flex justify-center items-center"
          >
            <div className="w-1/2">
              <img
                src={brandsDetails.image}
                alt={brandsDetails.name}
                className="w-[50%] mx-auto"
              />
            </div>
            <div className="w-1/2">
              <h2 className="text-2xl"> {brandsDetails.name} </h2>
              <h6 className="my-4 text-main">
                Created At :{" "}
                <span className="text-parg"> {brandsDetails.createdAt}</span>
              </h6>
              <h6 className="my-4 text-main">
                Updated At :{" "}
                <span className="text-parg"> {brandsDetails.updatedAt}</span>
              </h6>
            </div>
          </div>
        ) : (<Loading />)}
      </div>
    </div>    
    </>
  )
}

export default BrandsDetails
