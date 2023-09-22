import { bluenoise } from "./bluenoise.js"

process.stdout.write(`<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE thresholds [
  <!ELEMENT thresholds (threshold)+>
  <!ATTLIST thresholds xmlns CDATA #FIXED ''>
  <!ELEMENT threshold (description,levels)>
  <!ATTLIST threshold xmlns CDATA #FIXED '' alias NMTOKEN #IMPLIED
    map NMTOKEN #REQUIRED>
  <!ELEMENT description (#PCDATA)>
  <!ATTLIST description xmlns CDATA #FIXED ''>
  <!ELEMENT levels (#PCDATA)>
  <!ATTLIST levels xmlns CDATA #FIXED '' divisor CDATA #REQUIRED
    height CDATA #REQUIRED width CDATA #REQUIRED>
]>\n`)

process.stdout.write(`<thresholds>\n`)

for(let size=16; size<=256; size*=2) {
    const data = bluenoise(size, size).uint8Data()

    process.stdout.write(`\t<threshold map="bn${size}x${size}">\n`)
    process.stdout.write(`\t\t<description>Bluenoise dither map ${size}x${size}</description>\n`)
    process.stdout.write(`\t\t<levels width="${size}" height="${size}" divisor="256">\n`)
    for (let y = 0; y < size; y++) {
        process.stdout.write(`\t\t\t`)
        for (let x = 0; x < size; x++) {
            process.stdout.write(`${data[x + y * size]}`.padStart(4))
        }
        process.stdout.write('\n')
    }
    process.stdout.write(`\t\t</levels>\n`)
    process.stdout.write(`\t</threshold>\n`
    )
    process.stdout.write(`\t<threshold map="bni${size}x${size}">\n`)
    process.stdout.write(`\t\t<description>Bluenoise dither map inverse ${size}x${size}</description>\n`)
    process.stdout.write(`\t\t<levels width="${size}" height="${size}" divisor="256">\n`)
    for (let y = 0; y < size; y++) {
        process.stdout.write(`\t\t\t`)
        for (let x = 0; x < size; x++) {
            process.stdout.write(`${255-data[x + y * size]}`.padStart(4))
        }
        process.stdout.write('\n')
    }
    process.stdout.write(`\t\t</levels>\n`)
    process.stdout.write(`\t</threshold>\n`)

}

process.stdout.write(`</thresholds>\n`)

