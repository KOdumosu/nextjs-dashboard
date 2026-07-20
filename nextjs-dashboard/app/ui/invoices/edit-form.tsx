'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';

import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';

import { Button } from '@/app/ui/button';

import { useActionState } from 'react';

import { updateInvoice, State } from '@/app/lib/actions';



export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {


  const updateInvoiceWithId =
    updateInvoice.bind(null, invoice.id);



  const initialState: State = {

    message: null,

    errors: {},

  };



  const [state, formAction] = useActionState(
    updateInvoiceWithId,
    initialState
  );



  return (


    <form action={formAction}>


      <div className="rounded-md bg-gray-50 p-4 md:p-6">


        {/* Customer Name */}


        <div className="mb-4">


          <label
            htmlFor="customer"
            className="mb-2 block text-sm font-medium"
          >
            Choose customer
          </label>



          <div className="relative">


            <select

              id="customer"

              name="customerId"

              aria-describedby="customer-error"

              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"

              defaultValue={invoice.customer_id}

            >


              <option value="" disabled>

                Select a customer

              </option>



              {customers.map((customer)=>(


                <option
                  key={customer.id}
                  value={customer.id}
                >

                  {customer.name}

                </option>


              ))}


            </select>



            <UserCircleIcon
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px]"
            />



          </div>



          <div
            id="customer-error"
            aria-live="polite"
            aria-atomic="true"
          >

            {state.errors?.customerId?.map((error)=>(

              <p
                key={error}
                className="mt-2 text-sm text-red-500"
              >

                {error}

              </p>

            ))}


          </div>



        </div>





        {/* Amount */}


        <div className="mb-4">


          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium"
          >

            Choose an amount

          </label>



          <div className="relative">


            <input

              id="amount"

              name="amount"

              type="number"

              step="0.01"

              defaultValue={invoice.amount}

              aria-describedby="amount-error"

              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm"

            />



            <CurrencyDollarIcon
              className="absolute left-3 top-1/2 h-[18px] w-[18px]"
            />


          </div>



          <div
            id="amount-error"
            aria-live="polite"
            aria-atomic="true"
          >


            {state.errors?.amount?.map((error)=>(


              <p
                key={error}
                className="mt-2 text-sm text-red-500"
              >

                {error}

              </p>


            ))}



          </div>



        </div>





        {/* Status */}


        <fieldset>


          <legend className="mb-2 block text-sm font-medium">

            Set the invoice status

          </legend>



          <div className="rounded-md border bg-white px-[14px] py-3">


            <div className="flex gap-4">


              <label>


                <input

                  name="status"

                  type="radio"

                  value="pending"

                  defaultChecked={
                    invoice.status === 'pending'
                  }

                />

                Pending

                <ClockIcon className="inline h-4 w-4"/>


              </label>




              <label>


                <input

                  name="status"

                  type="radio"

                  value="paid"

                  defaultChecked={
                    invoice.status === 'paid'
                  }

                />


                Paid


                <CheckIcon className="inline h-4 w-4"/>


              </label>



            </div>


          </div>



          <div
            id="status-error"
            aria-live="polite"
            aria-atomic="true"
          >


            {state.errors?.status?.map((error)=>(

              <p
                key={error}
                className="mt-2 text-sm text-red-500"
              >

                {error}

              </p>

            ))}


          </div>


        </fieldset>



      </div>




      {state.message && (

        <p className="mt-2 text-sm text-red-500">

          {state.message}

        </p>

      )}


      <div className="mt-6 flex justify-end gap-4">


        <Link

          href="/dashboard/invoices"

          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm"

        >

          Cancel

        </Link>



        <Button type="submit">

          Edit Invoice

        </Button>



      </div>



    </form>


  );

}