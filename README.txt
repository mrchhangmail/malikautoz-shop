Malik Autoz - online shop (customer catalog + order on WhatsApp)

Files in this folder (upload all of them to the root of the malikautoz-shop repo):
  index.html         the customer page (browse by bike, add parts, send the order on WhatsApp)
  catalog.json       the parts list. Replace it each time you publish from the POS (Online Catalog tile).
  catalog-config.js  your shop details: WhatsApp number, phone, address, hours, logo file name
  _headers           tells Cloudflare how long browsers may keep each file
  icon-192.png       NOT in this zip: copy it from your POS repo (it is used as the logo and watermark)
  img/               NOT in this zip: create it when you have photos. Name each photo after the part's SKU,
                     for example img/ENG-0001.webp (or .jpg)

This shop is completely separate from the POS. Nothing here can read or change POS data.
