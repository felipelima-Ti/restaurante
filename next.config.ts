import type { NextConfig } from "next";
//import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "u9a6wmr3as.ufs.sh",
      },
      {
        hostname: "media.gettyimages.com",
      },
      {
        hostname:"www.admfacil.com"
      },
      {
        hostname: "is1-ssl.mzstatic"
      },
      {
        hostname: "wallpapers.com"
      },
      {
        hostname:"github.com"
      },
       {
        hostname:"minervafoods.com"
      },
      {
        hostname:"marketplace.canva.com"
      },
      {
        hostname:"media.istockphoto.com"
      },
      {
        hostname:"exemplo.com"
      },
      {
        hostname:"prezunic.vtexassets.com"
      },
      {
        hostname:"www.cardapio.donnagulla.com.br"
      },
      {
        hostname:"itanareceitas.com.br"
      },
      {
        hostname:"laticiniosbomdestino.com.br"
      },
      {
        hostname:"encrypted-tbn0.gstatic.com"
      },
      {
        hostname:"redefoodservice.com.br"
      },
      {
        hostname:"mavalerio.com.br"
      },
      {
        hostname:"s3-sa-east-1.amazonaws.com"
      },
      {
        hostname:"blog.novasafra.com.br"
      }
    ],
  },
};

export default nextConfig;
