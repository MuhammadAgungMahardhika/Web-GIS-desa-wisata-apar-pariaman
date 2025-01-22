<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <title><?= $title ?></title>

    <!-- template CSS -->
    <link rel="stylesheet" href="<?= base_url('/assets/css/main/app.css') ?>">
    <link rel="stylesheet" href="<?= base_url('/assets/css/main/app-dark.css') ?>">
    <link rel="shortcut icon" href="<?= base_url('assets/images/pesona_apar.png') ?>">

    <!-- My CSS -->
    <link rel="stylesheet" href="<?= base_url('/assets/css/main/style.css') ?>">

    <!-- Third Party Icon -->
    <script src="https://code.iconify.design/2/2.2.1/iconify.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">
    <!-- Third Party CSS and JS -->
    <link rel="stylesheet" href="<?= base_url('assets/css/shared/iconly.css'); ?>">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,200,0,0" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css" integrity="sha512-mSYUmp1HYZDFaVKK//63EcZq4iFWFjxSL+Z3T/aCt4IO9Cejm03q3NKKYN6pFQzY0SBOr8h+eCIAZHPXcpZaNw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js" integrity="sha512-T/tUfKSV1bihCnd+MxKD0Hm1uBBroVYBOYSk1knyvQ9VyZJpc/ALb4P0r6ubwVPSGB2GvjeoMAJJImBG12TiaQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://kit.fontawesome.com/de7d18ea4d.js" crossorigin="anonymous"></script>
    <!-- Sweet Alert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- Animate css -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <!-- GSAP -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"></script>

    <script src="<?= base_url('/assets/js/geom.js') ?>"></script>
    <?= $this->renderSection('head'); ?>
</head>

<body>
    <div class="loader-wrapper">
        <img src="<?= base_url('/assets/images/pesona_apar.png'); ?>" class="loader">
    </div>
    <div id="app">
        <?= $this->include('layout/sidebar'); ?>
        <!-- Main Content -->
        <div id="main">
            <?= $this->include('message/message.php'); ?>

            <?php if (isset($currentUrl) != 'mobile') : ?>
                <?= $this->include('layout/navbar'); ?>
            <?php endif; ?>

            <?= $this->renderSection('content'); ?>
            <?= $this->include('layout/footer'); ?>
        </div>
    </div>
</body>
<?php if (isset($currentUrl) == "mobile") : ?>
    <script>
        $('#sidebar').css("display", "none")
    </script>
<?php endif; ?>

<!-- Template JS -->
<script src="<?= base_url('/assets/js/app.js') ?>"></script>
<!-- Custom JS -->
<?= $this->renderSection('script') ?>

</html>