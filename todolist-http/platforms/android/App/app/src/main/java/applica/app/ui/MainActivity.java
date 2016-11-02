package applica.app.ui;

import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.CheckedTextView;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;

import applica.aj.AJ;
import applica.aj.AJApp;
import applica.aj.AJArray;
import applica.aj.AJObject;
import applica.aj.Store;
import applica.app.Actions;
import applica.app.R;
import applica.app.Stores;

public class MainActivity extends AppCompatActivity {

    private class TodosAdapter extends ArrayAdapter {

        public TodosAdapter(Context context) {
            super(context, android.R.layout.simple_list_item_checked);
        }

        @NonNull
        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            LayoutInflater inflater = ((LayoutInflater) getContext().getSystemService(LAYOUT_INFLATER_SERVICE));
            CheckedTextView view = (CheckedTextView) (convertView != null ? convertView : inflater.inflate(android.R.layout.simple_list_item_checked, parent, false));
            view.setText(mTodos.objectAt(position).get("text").asString());

            boolean complete = mTodos.objectAt(position).get("complete").asBoolean();
            if (complete) {
                view.setBackgroundColor(0xFFAAFFAA);
                view.setChecked(true);
            } else {
                view.setBackgroundColor(0xFFFFFFFF);
                view.setChecked(false);
            }

            return view;
        }

        @Override
        public int getCount() {
            return mTodos != null ? mTodos.count() : 0;
        }
    }

    private AJArray mTodos;
    private TodosAdapter mAdapter;

    private ListView mListView;
    private TextView mLabel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        setTitle("Todo List");

        mListView = (ListView) findViewById(R.id.list);
        mListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                int todoId = mTodos.objectAt(position).get("id").asInt();
                boolean complete = mTodos.objectAt(position).get("complete").asBoolean();
                AJ.run(Actions.TODO_COMPLETE, AJObject.create().set("id", todoId).set("complete", !complete));
            }
        });
        mLabel = (TextView) findViewById(R.id.label);

        mAdapter = new TodosAdapter(this);
        mListView.setAdapter(mAdapter);

        AJApp.runtime().subscribe(Stores.TODOS, this, new Store.Subscription() {
            @Override
            public void handle(AJObject state) {
                mTodos = state.get("todos").asArray();
                mAdapter.notifyDataSetChanged();

                if (mTodos.count() > 0) {
                    mListView.setVisibility(View.VISIBLE);
                    mLabel.setVisibility(View.INVISIBLE);
                } else {
                    mListView.setVisibility(View.INVISIBLE);
                    mLabel.setVisibility(View.VISIBLE);
                }
            }
        });
    }

    void createTodo() {
        final EditText input = new EditText(this);

        AlertDialog.Builder alertDialog = new AlertDialog.Builder(MainActivity.this);
        alertDialog.setTitle("Todo List");
        alertDialog.setMessage("What you have to do?");
        alertDialog.setView(input);
        alertDialog.setPositiveButton("Create",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        AJ.run(Actions.TODO_CREATE, AJObject.create().set("text", input.getText().toString()));
                    }
                });

        alertDialog.show();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        menu.add("ADD");

        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        createTodo();

        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        AJApp.runtime().unsubscribe(Stores.TODOS, this);
    }
}
