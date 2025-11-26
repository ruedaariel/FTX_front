import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { IniciarPagoDto } from '../dto/create-pago.dto';

@Injectable()
export class MercadoPagoService {
  private client: MercadoPagoConfig;
  private preference: Preference;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
    });
    this.preference = new Preference(this.client);
  }

  async crearPreferencia(iniciarPagoDto: IniciarPagoDto) {
    const preference = {
      items: [
        {
          id: `plan-${iniciarPagoDto.diasAdicionales}-dias`,
          title: iniciarPagoDto.descripcion,
          quantity: 1,
          currency_id: iniciarPagoDto.currency_id || 'ARS',
          unit_price: Number(iniciarPagoDto.monto),
        },
      ],
      payer: {
        name: iniciarPagoDto.payer.name,
        surname: iniciarPagoDto.payer.surname,
        email: iniciarPagoDto.payer.email,
        phone: iniciarPagoDto.payer.phone
          ? {
              number: iniciarPagoDto.payer.phone,
            }
          : undefined,
        identification:
          iniciarPagoDto.payer.identification_type &&
          iniciarPagoDto.payer.identification_number
            ? {
                type: iniciarPagoDto.payer.identification_type,
                number: iniciarPagoDto.payer.identification_number,
              }
            : undefined,
      },
      back_urls: iniciarPagoDto.back_urls
        ? {
            success: iniciarPagoDto.back_urls.success,
            failure: iniciarPagoDto.back_urls.failure,
            pending: iniciarPagoDto.back_urls.pending,
          }
        : undefined,
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: [],
        installments: iniciarPagoDto.installments || 1,
      },
      notification_url: iniciarPagoDto.notification_url,
      external_reference:
        iniciarPagoDto.external_reference || `usuario-${iniciarPagoDto.usuarioId}`,
      expires: iniciarPagoDto.expires ? true : false,
      expiration_date_from: iniciarPagoDto.expires
        ? new Date().toISOString()
        : undefined,
      expiration_date_to:
        iniciarPagoDto.expires && iniciarPagoDto.expires > 0
          ? new Date(Date.now() + iniciarPagoDto.expires * 60 * 1000).toISOString()
          : undefined,
    };

    return await this.preference.create({ body: preference });
  }

  async obtenerPago(pagoId: string) {
    // Implementar cuando sea necesario para webhooks
    return null;
  }
}