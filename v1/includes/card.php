<?php

declare(strict_types=1);

function render_place_card(array $place): void
{
    $id = (int) $place['id'];
    $searchBlob = strtolower(
        $place['name'] . ' ' . $place['region'] . ' ' . $place['short_text']
    );
    ?>
<a
  class="place-card"
  href="details.php?id=<?= $id ?>"
  data-category="<?= h($place['category']) ?>"
  data-search="<?= h($searchBlob) ?>"
>
  <div class="card-image">
    <img src="<?= h($place['image']) ?>" alt="<?= h($place['name']) ?>" loading="lazy" />
    <span class="badge"><?= h($place['category']) ?></span>
  </div>
  <div class="card-body">
    <h3><?= h($place['name']) ?></h3>
    <div class="card-meta"><?= h($place['region']) ?></div>
    <p><?= h($place['short_text']) ?></p>
  </div>
</a>
    <?php
}
