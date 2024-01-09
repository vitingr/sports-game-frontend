export const getMinValue = async (overall: number) => {
  if (overall >= 40 && overall <= 49) {
    return 50; // Carta Bronze
  }

  if (overall >= 50 && overall <= 64) {
    return 75; // Carta Bronze
  }

  if (overall >= 65 && overall <= 73) {
    return 150; // Carta Prata
  }

  if (overall >= 74 && overall <= 76) {
    return 350; // Carta Ouro
  }

  if (overall >= 77 && overall <= 78) {
    return 750; // Carta Ouro 78+
  }

  if (overall === 79) {
    return 1500; // Carta Ouro 79+
  }

  if (overall === 80) {
    return 2500; // Carta Ouro 80+
  }

  if (overall === 81) {
    return 5000; // Carta Ouro 81+
  }

  if (overall === 82) {
    return 10000; // Carta Ouro 82+
  }

  if (overall === 83) {
    return 15000; // Carta Ouro 83+
  }

  if (overall === 84) {
    return 20000; // Carta Ouro 84+
  }

  if (overall === 85) {
    return 25000; // Carta Ouro 85+
  }

  if (overall === 86) {
    return 35000; // Carta Ouro 86+
  }

  if (overall === 87) {
    return 50000; // Carta Ouro 87+
  }

  if (overall === 88) {
    return 75000; // Carta Ouro 88+
  }

  if (overall === 89) {
    return 100000; // Carta Ouro 89+
  }

  if (overall === 90) {
    return 250000; // Carta Ouro 90+
  }

  if (overall === 91) {
    return 500000; // Carta Ouro 91+
  }

  if (overall === 92) {
    return 1000000; // Carta Ouro 92+
  }

  if (overall === 93) {
    return 2000000; // Carta Ouro 93+
  }

  return 50; // Carta Especial (ou qualquer outro caso não coberto)
};
