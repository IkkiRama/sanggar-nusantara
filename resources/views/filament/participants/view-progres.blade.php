<div class="space-y-4">
    <div class="border-b pb-2">
        <h2 class="text-lg font-bold">{{ $record->user->name }}</h2>
        <p class="text-sm text-gray-500">
            Challenge: <strong>{{ $record->challenge->title }}</strong><br>
            Status:
            <span class="capitalize">
                @if ($record->status == 'in_progres')
                    In Progress
                @elseif ($record->status == 'Completed')
                    Completed
                @elseif ($record->status == 'Pending')
                    Pending
                @else
                    {{ $record->status }}
                @endif
            </span>
            <br>

            Started: {{ $record->started_at?->format('d M Y') ?? '-' }}<br>
            Completed: {{ $record->completed_at?->format('d M Y') ?? '-' }}
        </p>
    </div>

    <div class="overflow-x-auto">
        <table class="min-w-full text-sm border border-gray-200 rounded-lg">
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-4 py-2 text-left">Day</th>
                    <th class="px-4 py-2 text-left">Bukti</th>
                    <th class="px-4 py-2 text-left">Status</th>
                    <th class="px-4 py-2 text-left">Submitted</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($progres as $item)
                    <tr class="border-t">
                        <td class="px-4 py-2">{{ $item->day_number }}</td>
                        <td class="px-4 py-2">
                            @if ($item->image_bukti)
                                <img src="{{ Storage::url($item->image_bukti) }}" alt="Bukti Gambar" class="h-12 rounded">
                            @else
                                <span class="text-gray-400">Tidak Ada Bukti Gambar</span>
                            @endif
                        </td>
                        <td class="px-4 py-2 capitalize">
                            <span class="@class([
                                'text-gray-500' => $item->status === 'pending',
                                'text-green-600' => $item->status === 'approved',
                                'text-red-600' => $item->status === 'rejected',
                            ])">
                                {{ $item->status }}
                            </span>
                        </td>
                        <td class="px-4 py-2">{{ $item->created_at->format('d M Y H:i') }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4" class="px-4 py-3 text-center text-gray-400">No progress yet</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
