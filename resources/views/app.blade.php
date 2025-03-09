<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=7">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta property="og:site_name" content="Sanggar Nusantara"/>
    <meta name="author" content="Sanggar Nusantara,Rifki Romadhan">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{-- <meta name="robots" content="index,follow"> --}}
    <link rel="shortcut icon" href={{ asset("favicon.png") }} type="image/x-icon">
    <link rel="apple-touch-icon" href={{ asset("favicon.png") }}>

    <title inertia>{{ config('app.name', 'Sanggar Nusantara') }}</title>

    {{-- PWA --}}
    <link rel="manifest" href="{{ asset('manifest.json') }}" />
    <meta name="theme-color" content="#ffffff" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:100,200,300,400,500,600,700,800,900,1000&display=swap" rel="stylesheet" />


    @viteReactRefresh
    @vite(['resources/js/app.jsx', 'resources/css/app.css'])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    <script src="https://website-widgets.pages.dev/dist/sienna.min.js" defer></script>
    @inertia

</body>

</html>

