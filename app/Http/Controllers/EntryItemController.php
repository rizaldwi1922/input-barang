<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\InvoiceLine;
use App\Models\InvoiceHead;

class EntryItemController extends Controller
{
    public function form()
    {
        return Inertia::render('EntryItem/form');
    }

    public function index(){
        return Inertia::render('EntryItem/index');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'head.invoice_num' => 'required|string|max:255',
            'head.supplier' => 'required|string|max:255',
            'head.invoice_date' => 'required|date',
            'line' => 'required|array',
            'line.*.barcode' => 'required|string|max:255',
            'line.*.item_id' => 'required|integer',
            'line.*.item_name' => 'required|string|max:255',
            'line.*.uom_type' => 'required|string|max:255',
            'line.*.uom_big' => 'required|string|max:255',
            'line.*.uom_small' => 'required|string|max:255',
            'line.*.uom' => 'required|string|max:255',
            'line.*.stock' => 'required|integer|min:0',
            'line.*.stockLabel' => 'required|string|max:255',
            'line.*.price' => 'required|numeric|min:0',
            'line.*.qty' => 'required|integer|min:0',
            'line.*.input_date' => 'required|date',
            'line.*.expired_date' => 'required|date',
            'line.*.category' => 'required|string|max:255',
            'line.*.exchange' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        DB::transaction(function () use ($request) {
           
            $head = (object) $request->head;
            $head->id = null;
            $invHead = InvoiceHead::CreateOrUpdate($head);

            foreach($request->line as $item){
                $lineItem = (object) $item;
                $lineItem->id = null;
                $lineItem->invoice_num = $invHead->invoice_num;
                $lineItem->invoice_id = $invHead->id;
                InvoiceLine::CreateOrUpdate($lineItem);
            }
        });

        return response()->json([
            'message' => 'Data berhasil disimpan',
            'data' => $validated
        ]);
    }

    public function getAllData(Request $request)
    {
        $query = InvoiceHead::with(['line.item.uomBig', 'line.item.uomSmall'])
            ->withSum(['line as total_amount' => function($query) {
                $query->select(DB::raw('SUM(price * qty)'));
            }], 'total_amount')
            ->where('invoice_num', 'LIKE', '%' . $request->search . '%')
            ->paginate($request->itemPerPage, ['*'], 'page', $request->page);
        return $query;
    }
}
