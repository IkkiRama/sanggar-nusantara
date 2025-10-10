<div class="flex flex-col items-center gap-3">
    @if ($getRecord()?->image_bukti)
        <img
            src="{{ Storage::url($getRecord()->image_bukti) }}"
            alt="Proof Image"
            class="rounded-xl border shadow-md w-auto max-h-72 object-contain"
        >
    @else
        <div class="text-gray-500 italic">No proof image available</div>
    @endif
</div>
