"""Calcule le centre (centroïde, en mm MNI) de structures sous-corticales dans l'atlas Harvard-Oxford.

    python3 -m venv .venv && .venv/bin/pip install nilearn
    .venv/bin/python tools/atlas_centroids.py

Atlas : Harvard-Oxford subcortical, probabilité maximale, seuil 25 %, 1 mm (distribué avec FSL).
Le résultat sert à remplir anatomy.mm dans data/entities/structures.json.
"""
import nibabel as nib
import numpy as np
from nilearn import datasets

atlas = datasets.fetch_atlas_harvard_oxford("sub-maxprob-thr25-1mm", verbose=0)
img = nib.load(atlas.maps) if isinstance(atlas.maps, str) else atlas.maps
data, affine = np.asarray(img.dataobj), img.affine

for index, label in enumerate(atlas.labels):
    if label.startswith("Left ") and any(k in label for k in ("Thalamus", "Hippocampus", "Amygdala")):
        voxels = np.argwhere(data == index)
        x, y, z = nib.affines.apply_affine(affine, voxels.mean(axis=0))
        print(f"{label:20s} [{x:.1f}, {y:.1f}, {z:.1f}]  ({len(voxels)} voxels)")
