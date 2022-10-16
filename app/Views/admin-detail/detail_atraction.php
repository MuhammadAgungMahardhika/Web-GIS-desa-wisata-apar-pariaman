<?= $this->extend('layout/template.php') ?>
<?= $this->section('content') ?>
<section class="section">
    <div class="row">
        <!-- Object Detail Information -->
        <div class="col-md-6 col-12">
            <div class="row">
                <div class="card">
                    <div class="card-header">
                        <h5 class="m-0 font-weight-bold text-primary text-center">Detail Atraction</h5>
                        <div class="text-end">
                            <a href="<?= base_url('manage_atraction/edit/' . $objectData->id); ?>" role="button" class="btn btn-primary justify-item-center" title="edit"><i class="fa fa-edit"></i></a>
                        </div>
                        <h4 class="card-title text-center"><?= $objectData->name; ?></h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="form-group row">
                                <label for="category" class="col-sm-4 col-form-label">Category</label>
                                <div class="col-sm-8">
                                    <span class="form-control"><?= $objectData->category; ?></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="employe" class="col-sm-4 col-form-label">Employe</label>
                                <div class="col-sm-8">
                                    <span class="form-control"><?= $objectData->employe; ?></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="open" class="col-sm-4 col-form-label">Open</label>
                                <div class="col-sm-8">
                                    <span class="form-control"><?= $objectData->open; ?></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="close" class="col-sm-4 col-form-label">Close</label>
                                <div class="col-sm-8">
                                    <span class="form-control"><?= $objectData->close; ?></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="ticket" class="col-sm-4 col-form-label">Ticket</label>
                                <div class="col-sm-8">
                                    <span class="form-control"><?= $objectData->price; ?></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="contact_person" class="col-sm-4 col-form-label">Contact person</label>
                                <div class="col-sm-8">
                                    <span class="form-control"><?= $objectData->contact_person; ?></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="description" class="col-sm-4 col-form-label">Description</label>
                                <div class="col-sm-8">
                                    <span class="form-control"><?= $objectData->description; ?></span>
                                </div>
                            </div>
                        </div>
                        <div class="row my-2">
                            <h4 class="card-title text-center">Gallery</h4>
                            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                                <?php $no = 0; ?>
                                <ol class="carousel-indicators">
                                    <?php foreach ($galleryData as $gallery) : ?>
                                        <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="<?= esc($no); ?>" class="<?php if ($no == 0) echo 'active'; ?>"></li>
                                        <?php $no++; ?>
                                    <?php endforeach; ?>
                                </ol>
                                <div class="carousel-inner">
                                    <!-- List gallery -->
                                    <?php $no = 0; ?>
                                    <?php if (!$galleryData) : ?>
                                        <?= '<div class="text-center">
                                        <button class="col-sm-4 btn btn-outline-primary text-center">Gallery is empty!</button>
                                        </div>' ?>
                                    <?php endif; ?>
                                    <?php foreach ($galleryData as $gallery) : ?>
                                        <div class="carousel-item <?php if ($no == 0) echo 'active'; ?>">
                                            <img src="<?= base_url('media/photos/'); ?>/<?= $gallery->url; ?>" class="d-block w-100">
                                        </div>
                                        <?php $no++; ?>
                                    <?php endforeach; ?>
                                </div>
                                <a class=" carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </a>
                            </div>
                        </div>
                        <div class="row">
                            <h5 class="card-title text-center">Video</h5>
                            <?php if (!$objectData->video_url) : ?>
                                <?= '
                                <div class="text-center">
                                <button class="col-sm-4 btn btn-outline-primary text-center">Video is empty!</button>
                                </div>
                               ' ?>
                            <?php else : ?>
                                <div class="ratio ratio-16x9">
                                    <video src="<?= base_url('media/videos/'); ?>/<?= $objectData->video_url; ?>" class="embed-responsive-item" id="video" controls>Sorry, your browser doesn't support embedded videos</video>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-12">
            <!-- Object Location on Map -->
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Google Maps</h5>
                </div>
                <!-- Object Map body -->
                <?= $this->include('layout/map-body'); ?>
            </div>
        </div>
    </div>
</section>
<script>
    let indexUrl
    let datas = [<?= json_encode($objectData) ?>]
    let url = '<?= $url ?>'
    let geomApar = JSON.parse('<?= $aparData->geoJSON; ?>')
    let latApar = parseFloat(<?= $aparData->lat; ?>)
    let lngApar = parseFloat(<?= $aparData->lng; ?>)
</script>
<script src="<?= base_url('/assets/js/map.js') ?>"></script>
<!-- Maps JS -->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8B04MTIk7abJDVESr6SUF6f3Hgt1DPAY&region=ID&language=en&callback=initMap"></script>
<?= $this->endSection() ?>