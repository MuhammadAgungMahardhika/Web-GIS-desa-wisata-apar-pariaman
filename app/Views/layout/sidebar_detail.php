<div class="d-flex justify-content-center avatar avatar-xl me-3" id="avatar-sidebar">
    <img src="<?= base_url('/assets/images/pesona_apar_removebg.png'); ?>" alt="" srcset="" style="border-radius: 50%;height: 120px;width: 180px;">
</div>
<?php if (in_groups('user') || in_groups('admin')) : ?>
    <div class="p-2 d-flex justify-content-center">Hello, <?= user()->username; ?></div>
<?php else : ?>
    <div class="p-2 d-flex justify-content-center">Hello, Visitor</div>
<?php endif; ?>