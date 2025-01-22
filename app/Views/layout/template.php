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
    <script src="<?= base_url('assets/js/extensions/iconify.min.js') ?>"></script>
    <link rel="stylesheet" href="<?= base_url('assets/css/boxicon/boxicons.min.css'); ?>">
    <!-- Third Party CSS and JS -->
    <link rel="stylesheet" href="<?= base_url('assets/css/shared/iconly.css'); ?>">
    <!-- font google -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,200,0,0" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Jquery -->
    <script src="<?= base_url('assets/js/extensions/jquery-3.6.0.min.js') ?>"></script>
    <!-- datepicker -->
    <link rel="stylesheet" href="<?= base_url('assets/css/datepicker/bootstrap-datepicker.min.css') ?>" />
    <script src="<?= base_url('assets/js/extensions/bootstrap-datepicker.min.js') ?>"></script>
    <script src="<?= base_url('assets/js/extensions/de7d18ea4d.js') ?>"></script>

    <!-- Sweet Alert -->
    <script src="<?= base_url('assets/js/extensions/sweetalert2@11.js') ?>"></script>
    <!-- Animate css -->
    <link rel="stylesheet" href="<?= base_url('assets/css/animate/animate.min.css') ?>" />
    <!-- GSAP -->
    <script src="<?= base_url('assets/js/extensions/gsap.min.js') ?>"></script>
    <script src="<?= base_url('/assets/js/geom.js') ?>"></script>
    <?= $this->renderSection('head'); ?>
</head>

<body>
    <script>
        let base_url = '<?= base_url() ?>'
    </script>

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