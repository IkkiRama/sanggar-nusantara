<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>E-Tiket</title>
    <link href="https://fonts.bunny.net/css?family=figtree:100,200,300,400,500,600,700,800,900,1000&display=swap" rel="stylesheet" />
    <style>
        body {
            padding: 30px 0;
            background-color: #f5f5f5;
            font-family: Poppins, figtree, sans-serif;
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 40px;
            min-height: 100vh;
        }

        .ticket {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            width: 70%;
            /* max-width: 900px; */
            overflow: hidden;
        }

        .ticket-header p {
            font-weight: 600;
        }

        .ticket-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            background-image: url('/images/header etiket.png');
            background-size: cover;
            background-position: center;
            color: white;
        }

        .ticket-body {
            padding: 30px;
        }

        .event-container{
            padding: 20px;
            border: 2px solid oklch(0.872 0.01 258.338);
            border-radius: 10px;
        }

        .event-title {
            font-size: 23px;
            font-weight: 600;
            margin-bottom: 20px;
        }

        .event-info {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }

        .event-info img {
            width: 100%;
            max-width: 50%;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
            background-color: #ccc;
        }

        .info-block {
            display: flex;
            flex-direction: column;
            /* gap: 5px; */
            font-size: 17px;
            font-weight: 500;
            color: oklch(0.279 0.041 260.031);
        }

        .perInfo-event{
            display: flex;
            column-gap: 15px;
            align-items: center;
        }
        .perInfo-event svg{
            width: 25px;
            height: 25px;
            color: oklch(0.551 0.027 264.364);
        }

        .order-info {
            margin-top: 40px;
        }

        .order-title {
            font-size: 23px;
            font-weight: bold;
            margin-bottom: 30px;
            color: oklch(0.279 0.041 260.031);
        }

        .order-title i {
            color: oklch(0.704 0.04 256.788);
        }

        .order-detail {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 20px;
        }

        .detail-box-container{
            flex: 1 1 40%;
            border: 2px solid oklch(0.872 0.01 258.338);
            border-radius: 10px;
            padding: 20px;
        }
        .detail-box {
            display: flex;
            /* flex-wrap: wrap; */
            justify-content: space-between;
            justify-items: flex-end;
        }

        .detail-box p {
            margin: 10px 0;
        }

        .perDetail-box{
            /* width: 50%; */
        }

        .perDetail-box-title{
            margin-bottom: 10px;
            font-weight: 500;
            color:oklch(0.704 0.04 256.788)
        }

        .perDetail-box-isi.penting{
            font-weight: 700;
        }
        .perDetail-box-isi{
            font-size: 18px;
            font-weight: 500;
        }

        .qr-box {
            flex: 1 1;
            display: flex;
            border: 2px solid oklch(0.872 0.01 258.338);
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            padding: 20px;
        }

        .qr-box img {
            max-width: 100%;
        }

        .note {
            background-color: oklch(0.928 0.006 264.531);
            padding: 10px;
            border-radius: 5px;
            margin-top: 20px;
            font-weight: 500;
            font-size: 15px;
            line-height: 23px;
            color: oklch(0.372 0.044 257.287);
        }


        .pemisah{
            margin-bottom: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        @foreach($orders as $index => $order)
        @for($i = 1; $i <= $order["jumlah_tiket"]; $i++)
        <div class="ticket">
            <div class="ticket-header">
                <h2>Sanggar Nusantara</h2>
                <p>E-Tiket #{{ $i }}</p>
            </div>

            <div class="ticket-body">
                <div class="event-container">
                    <div class="event-title">{{ $order['nama_event'] }}</div>
                    <div class="event-info">
                        <img src="{{ $order['image'] ? asset('storage/' . $order['image']) : asset('/images/NO IMAGE AVAILABLE.jpg') }}"
                            alt="image event" />
                        <div class="info-block">
                            <div class="perInfo-event">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>

                                <p>{{ $order['tanggal_event'] }}</p>
                            </div>
                            <div class="perInfo-event">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                <p>
                                    {{ $order['tempat'] }}
                                </p>
                            </div>
                            <div class="perInfo-event">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ticket"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2"></path></svg>
                                <p>
                                    {{ $order['jenis_tiket'] }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="order-info">
                    <div class="order-title">Informasi Pesanan <i>/ Order Information</i></div>
                    <div class="order-detail">
                        <div class="detail-box-container">
                            <div class="detail-box">
                                <div>
                                    <div class="perDetail-box pemisah">
                                        <p class="perDetail-box-title">Nama <i>/ Name</i></p>
                                        <p class="perDetail-box-isi penting">{{ $order['name'] }}</p>
                                    </div>

                                    <div class="perDetail-box">
                                        <p class="perDetail-box-title">Tanggal Pembelian <i>/ Order Date</i></p>
                                        <p class="perDetail-box-isi">
                                            {{ $order['tanggal_pembelian'] }}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div class="perDetail-box pemisah">
                                        <p class="perDetail-box-title">Email <i>/ Email</i></p>
                                        <p class="perDetail-box-isi penting">{{ $order['email'] }}</p>
                                    </div>

                                    <div class="perDetail-box">
                                        <p class="perDetail-box-title">Referensi <i>/ Reference</i></p>
                                        <p class="perDetail-box-isi">Online</p>
                                    </div>
                                </div>
                            </div>
                            <div class="note">
                                Simpan tiket ini dan tunjukkan saat acara berlangsung. Tiket ini adalah bukti
                                pembelian Anda dan diperlukan untuk masuk ke lokasi acara. Jangan bagikan tiket ini
                                kepada orang lain untuk menghindari penyalahgunaan. Selamat menikmati acara!
                            </div>
                        </div>
                        <div class="qr-box">
                            {{-- <img src="{{ url('/qr/' . $order['order_id'] . '/' . $i) }}" alt="QR Code"> --}}
                            <img src="{{ asset('storage/qr/etiket-' . $order['order_id'] . '-' . $i . '.png') }}" alt="QR Code">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @endfor
        @endforeach
    </div>
</body>

</html>
