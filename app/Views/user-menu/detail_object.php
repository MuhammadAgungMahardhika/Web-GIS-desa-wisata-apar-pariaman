<?= $this->extend('layout/template.php') ?>
<?= $this->section('content') ?>
<section class="section">
    <div class="row">
        <!-- Object Detail Information -->
        <div class="col-md-6 col-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title text-center">Object Information</h4>
                    <!-- <div class="text-center">
                        <span class="material-symbols-outlined rating-color" id="s-1">star</span>
                        <span class="material-symbols-outlined rating-color" id="s-2">star</span>
                        <span class="material-symbols-outlined rating-color" id="s-3">star</span>
                        <span class="material-symbols-outlined rating-color" id="s-4">star</span>
                        <span class="material-symbols-outlined rating-color" id="s-5">star</span>
                    </div>
                    <p id="userTotal" class="text-center text-sm"></p> -->
                </div>
                <div class="card-body">
                    <?= $this->include('/layout/detail_object_body'); ?>
                </div>
            </div>

            <!--Rating and Review Section-->
        </div>
        <div class="col-md-6 col-12">
            <!-- Object Location on Map -->
            <div class="card">
                <!-- Object Map body -->
                <?= $this->include('layout/map-head'); ?>
                <!-- Object Map body -->
                <?= $this->include('layout/map-body'); ?>
            </div>
            <!-- Object Media -->
            <?= $this->include('layout/gallery_video'); ?>
        </div>
    </div>
</section>
<?= $this->endSection() ?>
<?= $this->section('script') ?>
<script>
    // Global variabel
    let datas = [<?= json_encode($objectData) ?>]
    let url = '<?= $url ?>'
    let id = "<?= $objectData->id ?>"
    let geomApar = JSON.parse('<?= $aparData->geoJSON; ?>')
    let latApar = parseFloat(<?= $aparData->lat; ?>)
    let lngApar = parseFloat(<?= $aparData->lng; ?>)
    currentObjectRating()
    currentUserRating()
    getObjectComment()

    function currentObjectRating() {
        $.ajax({
            url: "<?= base_url('detail_object'); ?>" + "/" + url + "/" + id,
            method: "get",
            dataType: "json",
            success: function(response) {
                if (response) {
                    let countRating = response.countRating.rating
                    let userTotal = response.userTotal.userTotal
                    let avgRating = Math.ceil(countRating / userTotal)

                    $('#userTotal').html(userTotal + ' people rate this ' + url)
                    if (avgRating == 5) {
                        $("#s-1,#s-2,#s-3,#s-4,#s-5").addClass('star-checked');
                    }
                    if (avgRating == 4) {
                        $("#s-1,#s-2,#s-3,#s-4").addClass('star-checked');
                        $("#s-5").removeClass('star-checked');
                    }
                    if (avgRating == 3) {
                        $("#s-1,#s-2,#s-3").addClass('star-checked');
                        $("#s-4,#s-5").removeClass('star-checked');
                    }
                    if (avgRating == 2) {
                        $("#s-1,#s-2").addClass('star-checked');
                        $("#s-3,#s-4,#s-5").removeClass('star-checked');
                    }
                    if (avgRating == 1) {
                        $("#s-1").addClass('star-checked');
                        $("#s-2,#s-3,#s-4,#s-5").removeClass('star-checked');
                    }
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(xhr.status + "\n" +
                    xhr.responseText + "\n" + thrownError);
            }
        });
    }

    function currentUserRating() {
        <?php if (logged_in() == false) : ?>

        <?php else : ?>
            $.ajax({
                url: "<?= base_url('detail_object'); ?>" + "/" + url + "/" + id,
                method: "get",
                data: {
                    user_id: '<?= user()->id ?>'
                },
                dataType: "json",
                success: function(response) {
                    if (response.userRating) {
                        let userRating = response.userRating.rating
                        let updatedDate = response.userRating.updated_date
                        $('#rateText').html('Last updated at: ' + updatedDate)
                        return setStar(userRating)
                    }
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    alert(xhr.status + "\n" +
                        xhr.responseText + "\n" + thrownError);
                }
            });
        <?php endif; ?>

    }

    function getObjectComment() {
        $.ajax({
            url: "<?= base_url() ?>" + "/" + "review" + "/" + "get_" + url + "_comment",
            method: "GET",
            data: {
                'object_id': '<?= $objectData->id ?>'
            },
            dataType: "json",
            success: function(response) {
                if (response) {
                    $('#commentBody').html('')
                    for (i in response) {
                        $('#commentBody').prepend(`<tr><td><p class="mb-0">${response[i].name}</p><p class="fw-light">${response[i].date}</p><p class="fw-bold">${response[i].comment}</p></td></tr>`);
                    }
                }
            }
        });
    }
    $("#formReview").submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: "<?= base_url() ?>" + "/" + "review" + "/" + "comment_" + url,
            method: "POST",
            data: $(this).serialize(),
            dataType: "json",
            success: function(response) {
                document.getElementById("formReview").reset();
                getObjectComment()
            }
        });
    });
</script>
<script src="<?= base_url('/assets/js/map.js') ?>"></script>
<!-- Maps JS -->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8B04MTIk7abJDVESr6SUF6f3Hgt1DPAY&callback=initMap"></script>
<?= $this->endSection() ?>