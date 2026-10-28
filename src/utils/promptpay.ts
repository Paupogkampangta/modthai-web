import QRCode from 'qrcode';

/**
 * CRC16 calculation according to CCITT standard
 */
function crc16(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    const code = data.charCodeAt(i);
    crc ^= code << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  const hex = (crc & 0xffff).toString(16).toUpperCase();
  return hex.padStart(4, '0');
}

function formatTag(id: string, value: string): string {
  const len = value.length.toString().padStart(2, '0');
  return `${id}${len}${value}`;
}

/**
 * Generate EMVCo PromptPay QR Code payload
 */
export function generatePromptPayPayload(targetPhoneOrId: string, amount?: number): string {
  const cleanId = targetPhoneOrId.replace(/[^0-9]/g, '');

  let recipientFormatted = '';
  let subTag = '01'; // 01 for mobile phone

  if (cleanId.length === 10 && cleanId.startsWith('0')) {
    // Thai Mobile Phone (08x, 09x, 06x) -> 0066xxxxxxxxx
    recipientFormatted = '0066' + cleanId.substring(1);
    subTag = '01';
  } else if (cleanId.length === 13) {
    // National ID or Tax ID
    recipientFormatted = cleanId;
    subTag = '02';
  } else {
    // Default fallback phone format
    recipientFormatted = '0066' + cleanId.replace(/^0+/, '');
    subTag = '01';
  }

  // Sub tags for PromptPay (Tag 29)
  const aid = formatTag('00', 'A000000677010111');
  const recipient = formatTag(subTag, recipientFormatted);
  const tag29 = formatTag('29', aid + recipient);

  // Payload format indicator
  let payload = formatTag('00', '01');
  // Point of initiation method: 11 = Static (no amount), 12 = Dynamic (with amount)
  payload += formatTag('01', amount && amount > 0 ? '12' : '11');
  payload += tag29;
  // Country Code TH
  payload += formatTag('58', 'TH');
  // Currency code 764 (THB)
  payload += formatTag('53', '764');

  if (amount && amount > 0) {
    const formattedAmount = Number(amount).toFixed(2);
    payload += formatTag('54', formattedAmount);
  }

  // Tag 63 is CRC checksum
  const beforeCrc = payload + '6304';
  const checksum = crc16(beforeCrc);
  return beforeCrc + checksum;
}

/**
 * Generate Data URL (PNG) of PromptPay QR
 */
export async function generatePromptPayQrDataUrl(
  phoneOrId: string,
  amount?: number
): Promise<string> {
  try {
    const payload = generatePromptPayPayload(phoneOrId, amount);
    return await QRCode.toDataURL(payload, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 400,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    return '';
  }
}
